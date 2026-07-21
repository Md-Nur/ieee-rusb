import dbConnect from "../src/lib/dbConnect";
import UserModel from "../src/models/user.model";

async function revertAdvisor() {
  await dbConnect();
  await UserModel.updateOne(
    { name: "Dr. Abu Zafor Muhammad Touhidul Islam" },
    { $set: { societies: [] } }
  );
  console.log("Reverted branch advisor societies");
  process.exit(0);
}

revertAdvisor().catch((err) => {
  console.error(err);
  process.exit(1);
});
