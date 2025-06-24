import { DATA_COLLECTION, META_COLLECTION } from "@/lib/constants";
import { StopSearchFilters } from "@/types/stop-search";
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

  lastWeek.setDate(lastWeek.getDate() - 7);
  lastWeek.setHours(0, 0, 0, 0);

  try {
    const record = await meta.findOne<MetaDocument>({
      lastUpdated: {
        $gte: lastWeek,
      },
    });

    if (!record) {
      const record2 = await meta.findOne<MetaDocument>({});

      if (!record2) {
        return {
          stale: true,
          hasData: false,
          lastUpdated: null,
        };
      }

      return {
        stale: true,
        hasData: !!record2?.hasData,
        lastUpdated: record2?.lastUpdated ?? null,
      };
    }

    return {
      stale: false,
      hasData: true,
      lastUpdated: record.lastUpdated,
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
  const dataCollection = db.collection(DATA_COLLECTION);

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

export async function persist(db: Db, docs: any[]) {
  const dataCollection = db.collection(DATA_COLLECTION);
  const meta = db.collection(META_COLLECTION);

  let updated = false;

  try {
    await dataCollection.deleteMany({});
  } catch (e) {
    console.error("Failed to delete expired cache data, original error:", e);
    return updated;
  }

  try {
    const result = await dataCollection.insertMany(docs);
    console.log("updated stop search collection with", result.insertedCount);
    updated = result.insertedCount === docs.length;
  } catch (e) {
    console.error(
      "Failed to update mongo cache with fresh data, original error:",
      e
    );
  }

  if (!updated) {
    return false;
  }

  // update last updated if successfully stored fresh data
  try {
    const doc = {
      lastUpdated: new Date(),
      hasData: true,
    };

    const result = await meta.updateOne({}, { $set: doc }, { upsert: true });

    console.log("updated meta with", result.upsertedId);
    return true;
  } catch (e) {
    console.error("Failed to update mongo meta, original error", e);
    return false;
  }
}
