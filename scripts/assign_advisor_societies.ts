import dbConnect from "../src/lib/dbConnect";
import UserModel from "../src/models/user.model";

async function assignAdvisorSocieties() {
  await dbConnect();

  const allSocieties = [
    "robotics-&-automation-society",
    "signal-processing-society",
    "power-&-energy-society",
    "computer-society",
    "antenna-&-propagation-society",
    "women-in-engineering-society",
  ];

  // Assign all societies to the branch advisor
  await UserModel.updateOne(
    { name: "Dr. Abu Zafor Muhammad Touhidul Islam" },
    { $set: { societies: allSocieties } }
  );

  console.log("Advisor assigned to all societies");
  process.exit(0);
}

assignAdvisorSocieties().catch((err) => {
  console.error(err);
  process.exit(1);
});
