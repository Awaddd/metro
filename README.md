This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Install dependencies

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tool choice

- MongoDB - persist aggregated data from all queries, revalidating this data on a regular basis to keep up to date with the police stop and search api. Considered storing the data in a json file or a json blob in an SQL database, and also storing in an SQL database. Each approach had issues, i.e. the simple deployment solutions I'd like to use such as vercel don't allow write access or only allow access to writing to a temp file with limited size. Hence the move to databases; NoSQL is faster and I'm dealing with many records which is the primary reason for using MongoDB over solutions such as PostgreSQL. Also, it's quicker to get started and deploy because it's schemaless and has a dedicated cloud environment (atlas).

- React Query - client side query state shared across multiple components. The first component to make a request i.e. get stop search data with a date filter will propogate the changes to all the other components. The filtered data for that data will persist even if we query another date

- Zustand - simple state management solution that works out of the box. Useful for tracking things like filters across the application

## Why didn't I use Docker?

In most cases I’d self-host and use Docker, writing the aggregated data to a json file. However, this assignment required a quick, reliable deployment path, and platforms like Vercel don’t support persistent local writes. To work around this, I used MongoDB Atlas as an external data store, which also simplified deployment and fit well with a serverless architecture.

## Notes

Current caching strategy is not working. It results in a slow ingestion and slow reads.

An alternative strategy is to only cache pre-computed statistics i.e. all of the statistics I plan to show, instead of all of the documents.

The problem with this is applying filters, at most I would only be able to apply the date filter if I stored the pre-computed statistics on a month by month basis and simply showed the aggregated results aka "all data" when the user first loads the app, and then individual months when a user selects a month.

Another idea I had was to simply reduce the payload size of the stored objects when storing all objects i.e. cut down from all properties to just the few that would be used in calculations. However I was experiencing slow loads when only working with 7 months worth of data. So even if we were to reduce the size of objects stored, if we went back to fetching all records (28 months, aka 4 times more), it would completely negate the effect of reducing the size of objects and lead to the same result of slow loading.

It's important that we move any slowness to when we initially write data to the cache, and that we offload that write from the end user. Initially I wanted to do a fire and forget but it might just be simpler to do a cron job. My concerns with doing a cron was that it would be difficult to deploy and would require its own infrastructure separate from the main app, but that tradeoff might be worth it now to ensure we get a great user experience without overcomplicating the app.

Back to the pre-compute strategy, one solution to fix the filter problem is to store all of the possible combinations of filters on the data. i.e. assuming we selected the following filters of month, age range and type (person search etc), we would have around 500 unique combinations as opposed to the hundreds of thousands of raw data we were storing before. Currently we have about 28 months of metropolitan police data, 6 age ranges including null and 3 types of search. 28 x 6 x 3 = 504

## Notes 2

Implemented a bare bones version of the pre-compute strategy and I'm pleased with the results. As before, I'm fetching 7 months worth of data. We still have a slow ingestion, but this time it's due to the time it takes to fetch from the police API as opposed to the time it takes to write the records to Mongo.

Here are the logs

fetchSevenRecords: 14.322s

unique months Set(7) {
'2024-08',
'2024-07',
'2024-06',
'2024-05',
'2024-04',
'2024-03',
'2024-02'
}

unique age groups Set(6) {
'over 34',
'18-24',
null,
'25-34',
'10-17',
'under 10'
}

unique types Set(3) {
'Person search',
'Vehicle search',
'Person and Vehicle search'
}

total num of combinations 126

calculateStatistics: 1.261s

Deleted 0 record(s)
Inserted 90 record(s)
updated meta with new ObjectId('685d24f36292153d68582f27')

overallFetchAndPersistComputedStatistics: 15.756s

filterStatistics: 0.455ms

As you can see, the bulk of the time is on the fetch. This would only happen when the cache is completely empty. We can improve the UX so that if data is stale, we fetch in background and indicate that to the user and show stale data in the mean time. If cache is present, things should load immediately as we are barely dealing with any files, 90 in this case.

Now when loading from cache, the whole read takes 48.423ms

## Notes 3

Decided to move the whole write to cache operation to a cron job, hosted on dokploy on my VPS. The reason for this is separation of concerns and to move complexity away from the client. The client is singularly responsible for displaying data, filtered or otherwise. The cron job is responsible for populating the data. This model allows me to avoid strange behaviour and to simplify the implementation, making it easier to maintain. If there's an issue with writing to cache, I can investigate the cron job script, and any issues with displaying the data will lead me to looking into the frontend.

I also ran into race conditions when deploying with the previous strategy. Because my app couldn’t connect to Mongo initially (due to IP not being whitelisted), it tried fetching data directly from the Police API to create a new cache. I refreshed multiple times while debugging, which caused multiple parallel requests. This could have potentially locked me out of the Police API and hit rate limits. It’s better to avoid expensive client-side operations that risk wasting resources, especially in a real production environment.

## Concept

Show stale data and fetch in background, updating ui on completion

Example:

```
if (stale && hasData) {

  // if the current cache is stale but it has data, return the stale data,
  // trigger a fetch to happen in the background
  // and inform the user visually

  runInBackground(() => fetchAndPersist(db));

  // need a mechanism to change the stale property displayed to the user when this is completed

  // so the frontend knows to show new data and stop showing "showing stale data, fetching in the background"
}
```

## Notes 4

Ran the fetch and persist script. Fetched all available data (28 months worth). This is how it turned out:

- Data is fetched in batches of 7 months to stay within API rate limits.
- Fetching all 28 months of data takes around 20 to 22 seconds.
- Calculating statistics after fetch takes about 30 seconds.
- Around 440 aggregated records are inserted into the database each run.

This was my second attempt. The first attempt used batches of 10, which pushed too close to the API limit and caused a failure (we lost one month). Dropping batch size to 7 caused it to run smoothly. Another potential improvement is to add a delay between each batch.

## Things I would have added given time

- show stale data while kicking off a request to an external application to write to cache. Make use of locks and transactions to avoid race conditions and ensure all steps of the write take place i.e. removing previous data, adding new and updating meta

- move the current filter parameters to the url i.e. ?date=2024-08

- share types across both the main nextjs application and the cron job to write to cache

- button near the date filter to automatically filter to the month with the latest records i.e. august 2024

- use ai to change statistic labels such as "Evidence of offenses under the act" to something more concise i.e. "Offenses". We would first get all of the unique possible values and then send them off to an ai agent to simplify them for us, giving us data such as:

- clean up the codebase

- make use of suspense and error boundaries to improve percieved performance and UX. Skeleton loaders, error versions of the data components etc

```
{
    id: "evidence-of-offenses-under-the-act",
    truncated: "Offenses",
    full: "Evidence of offenses under the act"
}
```

This is more preferrable to my current approach of reducing to the first word, and showing the full label on hover

- table with pagination

- location filter

- trends tab with line charts showing change in data

- map view
