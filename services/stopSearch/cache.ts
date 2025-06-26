import { DATA_COLLECTION, META_COLLECTION } from "@/lib/constants";
import {
  StopSearchData,
  StopSearchFilters,
  StopSearchResponse,
} from "@/types/stop-search";
import { Db } from "mongodb";

type MetaDocument = {
  lastUpdated: Date | null;
  hasData: boolean;
};

type CacheStatus = {
  stale: boolean;
  hasData: boolean;
  lastUpdated: Date | null;
};

export async function validateCache(db: Db): Promise<CacheStatus> {
  const meta = db.collection(META_COLLECTION);

  const lastWeek = new Date();

  lastWeek.setDate(new Date().getDate() - 7);
  lastWeek.setHours(0, 0, 0, 0);

  try {
    const record = await meta.findOne<MetaDocument>({
      lastUpdated: {
        $gte: lastWeek,
      },
    });

    if (record) {
      return {
        stale: false,
        hasData: record.hasData,
        lastUpdated: record.lastUpdated,
      };
    }

    // if we failed to find a record in the last week, check if we have any data at all even if stale
    const record2 = await meta.findOne<MetaDocument>({});

    if (!record2) {
      throw new Error("Meta document does not exist");
    }

    return {
      stale: true,
      hasData: !!record2.hasData,
      lastUpdated: record2.lastUpdated ?? null,
    };
  } catch (e) {
    console.error("Error checking last updated, original error: ", e);
    return {
      stale: true,
      hasData: false,
      lastUpdated: null,
    };
  }
}

export async function loadFromCache(db: Db, filters: StopSearchFilters) {
  const dataCollection = db.collection<StopSearchData>(DATA_COLLECTION);

  try {
    return await dataCollection.find().toArray();
  } catch (e) {
    console.error(
      "Failed to load stop and search data from cache, original error:",
      e
    );
    return [];
  }
}

export async function persist(db: Db, docs: StopSearchData[]) {
  const dataCollection = db.collection(DATA_COLLECTION);
  const meta = db.collection(META_COLLECTION);

  let updated = false;

  // do nothing if no data
  if (!docs || docs.length === 0) {
    return updated;
  }

  try {
    const result = await dataCollection.deleteMany({});
    console.log(`Deleted ${result.deletedCount} record(s)`);
  } catch (e) {
    console.error("Failed to delete expired cache data, original error:", e);
    return updated;
  }

  try {
    const result = await dataCollection.insertMany(docs);
    console.log(`Inserted ${result.insertedCount} record(s)`);

    updated = result.insertedCount === docs.length;
  } catch (e) {
    console.error(
      "Failed to update mongo cache with fresh data, original error:",
      e
    );
  }

  if (!updated) {
    // should be setting hasData to false if the insert above failed
    return false;
  }

  // update last updated if successfully stored fresh data
  try {
    const doc = {
      lastUpdated: new Date(),
      hasData: true,
    };

    // need to add unique id
    const result = await meta.updateOne({}, { $set: doc }, { upsert: true });

    console.log("updated meta with", result.upsertedId);
    return true;
  } catch (e) {
    console.error("Failed to update mongo meta, original error", e);
    return false;
  }
}
