import dbConnect from "../src/lib/dbConnect";
import ContentModel from "../src/models/content.model";
import UserModel from "../src/models/user.model";

const societyMap: Record<string, string> = {
  "robotics-&-automation-society": "ras",
  "signal-processing-society": "sps",
  "power-&-energy-society": "pes",
  "computer-society": "cs",
  "antenna-&-propagation-society": "aps",
  "women-in-engineering-society": "wie",
};

async function migrateSocieties() {
  await dbConnect();

  // Migrate contents collection (societies field)
  const allContents = await ContentModel.find({ societies: { $exists: true, $ne: [] } });
  let contentUpdated = 0;
  for (const doc of allContents) {
    const old = doc.societies || [];
    const mapped = old.map((s: string) => societyMap[s] || s);
    if (JSON.stringify(old) !== JSON.stringify(mapped)) {
      await ContentModel.updateOne({ _id: doc._id }, { $set: { societies: mapped } });
      contentUpdated++;
    }
  }
  console.log(`Updated societies field for ${contentUpdated} contents`);

  // Migrate users collection (societies field)
  const allUsers = await UserModel.find({ societies: { $exists: true, $ne: [] } });
  let userUpdated = 0;
  for (const doc of allUsers) {
    const old = doc.societies || [];
    const mapped = old.map((s: string) => societyMap[s] || s);
    if (JSON.stringify(old) !== JSON.stringify(mapped)) {
      await UserModel.updateOne({ _id: doc._id }, { $set: { societies: mapped } });
      userUpdated++;
    }
  }
  console.log(`Updated societies field for ${userUpdated} users`);

  console.log("Migration complete");
  process.exit(0);
}

migrateSocieties().catch((err) => {
  console.error(err);
  process.exit(1);
});
