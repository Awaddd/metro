import { DATA_COLLECTION, META_COLLECTION } from "@/lib/constants";
import { Db } from "mongodb";

export async function isCacheValid(db: Db) {
  const meta = db.collection(META_COLLECTION);

  const startOfDay = new Date();
  const endOfDay = new Date();

  startOfDay.setHours(0, 0, 0, 0);
  endOfDay.setHours(23, 59, 59, 999);

  try {
    const record = await meta.findOne({
      lastUpdated: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    return !!record;
  } catch (e) {
    console.error("Error checking last updated, original error: ", e);
    return false;
  }
}

export async function loadFromCache(db: Db) {
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

  // update meta if successfully updated data
  try {
    const doc = {
      lastUpdated: new Date(),
    };

    const result = await meta.updateOne({}, { $set: doc }, { upsert: true });

    console.log("updated meta with", result.upsertedId);
    return true;
  } catch (e) {
    console.error("Failed to update mongo meta, original error", e);
    return false;
  }
}
