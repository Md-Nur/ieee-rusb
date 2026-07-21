import dbConnect from "../src/lib/dbConnect";
import mongoose from "mongoose";

async function migrate() {
  await dbConnect();
  const db = mongoose.connection.db!;
  const contents = db.collection("contents");

  // Migrate docs that still have the old `society` field
  const withOld = await contents.countDocuments({ society: { $exists: true } });
  console.log(`Docs with old 'society' field: ${withOld}`);

  await contents.updateMany(
    { society: { $exists: true, $ne: null } },
    [{ $set: { societies: ["$society"] } }, { $unset: ["society"] }]
  );
  console.log("Migrated old society field to societies array");

  // Set default for docs without societies field
  const without = await contents.countDocuments({ societies: { $exists: false } });
  console.log(`Docs without 'societies' field: ${without}`);

  await contents.updateMany(
    { societies: { $exists: false } },
    { $set: { societies: ["main"] } }
  );
  console.log("Set default societies for remaining docs");

  const total = await contents.countDocuments();
  console.log(`Total: ${total}`);

  // Verify
  const rasEvents = await contents.countDocuments({ societies: "robotics-&-automation-society" });
  console.log(`RAS events: ${rasEvents}`);
  const wieEvents = await contents.countDocuments({ societies: "women-in-engineering-society" });
  console.log(`WIE events: ${wieEvents}`);

  process.exit(0);
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
