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
