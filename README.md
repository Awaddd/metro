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

- MongoDB - persist aggregated data from all queries, revalidating this data on a daily basis to keep up to date with the police stop and search api. Considered storing the data in a json file or a json blob in an SQL database, and also storing in normalised columns in an SQL database. Each approach had issues, i.e. the simple deployment solutions I'd like to use such as vercel don't allow write access or only allow access to writing to a temp file with limited size. Hence the move to databases; NoSQL is faster and I'm dealing with many records which is the primary reason for using MongoDB over solutions such as PostgreSQL. Also, it's quicker to get started and deploy because it's schemaless and has a dedicated cloud environment (atlas).

- React Query - client side query state shared across multiple components. The first component to make a request i.e. get stop search data with a date filter will propogate the changes to all the other components. The filtered data for that data will persist even if we query another date

- Zustand - simple state management solution that works out of the box. Useful for tracking things like filters across the application

## Why didn't I use Docker?

In most cases I’d self-host and use Docker, writing the aggregated data to a json file. However, this assignment required a quick, reliable deployment path, and platforms like Vercel don’t support persistent local writes. To work around this, I used MongoDB Atlas as an external data store, which also simplified deployment and fit well with a serverless architecture.

## What would I have done differently if I had time

I would have wrapped some of my mongo calls in transactions to ensure data is added or removed together in unison if all operations succeed.

## Notes

Current caching strategy is not working. It results in a slow ingestion and slow reads.

An alternative strategy is to only cache pre-computed statistics i.e. all of the statistics I plan to show, instead of all of the documents.

The problem with this is applying filters, at most I would only be able to apply the date filter if I stored the pre-computed statistics on a month by month basis and simply showed the aggregated results aka "all data" when the user first loads the app, and then individual months when a user selects a month.

Another idea I had was to simply reduce the payload size of the stored objects when storing all objects i.e. cut down from all properties to just the few that would be used in calculations. However I was experiencing slow loads when only working with 7 months worth of data. So even if we were to reduce the size of objects stored, if we went back to fetching all records (28 months, aka 4 times more), it would completely negate the effect of reducing the size of objects and lead to the same result of slow loading.

It's important that we move any slowness to when we initially write data to the cache, and that we offload that write from the end user. Initially I wanted to do a fire and forget but it might just be simpler to do a cron job. My concerns with doing a cron was that it would be difficult to deploy and would require its own infrastructure separate from the main app, but that tradeoff might be worth it now to ensure we get a great user experience without overcomplicating the app.

Back to the pre-compute strategy, one solution to fix the filter problem is to store all of the possible combinations of filters on the data. i.e. assuming we selected the following filters of month, age range and type (person search etc), we would have around 500 unique combinations as opposed to the hundreds of thousands of raw data we were storing before. Currently we have about 28 months of metropolitan police data, 6 age ranges including null and 3 types of search. 28 x 6 x 3 = 504
