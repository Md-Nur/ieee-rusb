import { Document, Model, model, models, Schema } from "mongoose";

export interface Users extends Document {
  name: string;
  email: string;
  avatar?: string;
  phone: string;
  password: string;
  roles: string[];
  isAdmin: boolean;
  societies: string[];
  isApproved: boolean;
  dept: string;
  session?: string;
  designation?: string;
}

const UserSchema = new Schema<Users>({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    default: [],
    enum: [
      "executive-committee",
      "faculty-member",
      "student-member",
      "gradute-member",
      "alumni",
    ],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  societies: {
    type: [String],
    default: [],
    enum: [
      "robotics-&-automation-society",
      "signal-processing-society",
      "power-&-energy-society",
      "computer-society",
      "antenna-&-propagation-society",
      "women-in-engineering-society",
    ],
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  dept: {
    type: String,
    required: true,
    enum: ["EEE", "CSE", "MSE", "ICE", "ACCE", "Others"],
  },
  session: {
    type: String,
  },
  designation: {
    type: String,
    enum: [
      "Professor",
      "Associate Professor",
      "Assistant Professor",
      "Lecturer",
      "Other",
    ],
  },
});

const UserModel =
  (models.User as Model<Users>) || model<Users>("User", UserSchema);

export default UserModel;
