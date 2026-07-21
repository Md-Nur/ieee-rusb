import dbConnect from "../src/lib/dbConnect";
import UserModel from "../src/models/user.model";

async function setECTerm() {
  await dbConnect();
  await UserModel.updateMany(
    {
      isApproved: true,
      position: { $ne: "Other" },
      $or: [
        { roles: { $elemMatch: { $eq: "executive-committee" } } },
        { position: { $nin: ["Alumni", "Senior Member", "Member"] } }
      ]
    },
    { $set: { ecTerm: "2026" } }
  );
  const count = await UserModel.countDocuments({ ecTerm: "2026" });
  console.log(`Set ecTerm="2026" for ${count} users`);
  process.exit(0);
}

setECTerm().catch((err) => {
  console.error(err);
  process.exit(1);
});
