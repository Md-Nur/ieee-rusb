const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

// Polyfill dotenv
const envPath = path.resolve(__dirname, "../../.env");
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf8");
  envConfig.split("\n").forEach((line) => {
    const parts = line.split("=");
    const key = parts[0]?.trim();
    if (key && parts.length > 1) {
        // join back the rest in case value has '='
        let value = parts.slice(1).join("=").trim(); 
        // Remove quotes if present
        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1);
        }
        process.env[key] = value;
    }
  });
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined");
  process.exit(1);
}

const UserSchema = new mongoose.Schema({
  name: String,
  society_designations: [{ society: String, designation: String }],
  isApproved: Boolean,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function debugRasUsers() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const users = await User.find({
      name: { $regex: "Foez Ahmed", $options: "i" },
      isApproved: true,
    });

    console.log(`Found ${users.length} users matching "Foez Ahmed":`);
    users.forEach((u) => {
      console.log(`- Name: "${u.name}", Position: "${u.position}"`);
    });

    await mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
}

debugRasUsers();
