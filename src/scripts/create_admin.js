
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

try {
  const envPath = path.resolve(process.cwd(), '.env');
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach(line => {
    const parts = line.split('=');
    const key = parts.shift();
    const value = parts.join('=');
    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  });
} catch (e) {
  console.warn("Could not read .env file");
}

const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = { bufferCommands: false };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  roles: { type: [String], default: [] },
  position: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  societies: { type: [String], default: [] },
  isApproved: { type: Boolean, default: false },
  dept: { type: String, required: true },
  session: { type: String },
  designation: { type: String },
  ieee_id: { type: String, required: true },
  society_designations: { type: [{ society: String, designation: String }], default: [] },
});

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

async function main() {
  await dbConnect();
  
  const adminEmail = "admin@test.com";
  const existingUser = await UserModel.findOne({ email: adminEmail });
  
  if (existingUser) {
    console.log("Admin user already exists. Updating to ensure admin status...");
    existingUser.isAdmin = true;
    existingUser.isApproved = true;
    await existingUser.save();
    console.log("User updated.");
  } else {
    console.log("Creating new admin user...");
    const hashedPassword = await bcrypt.hash("123456", 12);
    const newUser = await UserModel.create({
      name: "Admin User",
      email: adminEmail,
      phone: "01700000000",
      password: hashedPassword,
      roles: ["executive-committee"],
      position: "Chairperson",
      isAdmin: true,
      isApproved: true,
      dept: "Computer Science & Engineering",
      ieee_id: "12345678",
      society_designations: []
    });
    console.log("Admin user created.");
  }
  
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
