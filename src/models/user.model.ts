import { Document, Model, model, models, Schema } from "mongoose";

export interface Users extends Document {
  name: string;
  email: string;
  avatar?: string;
  phone: string;
  linkedin?: string;
  password: string;
  roles: string[];
  position: string;
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
  linkedin: {
    type: String,
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
      "graduate-member",
      "alumni",
    ],
  },
  position: {
    type: String,
    enum: [
      "Chairperson",
      "Vice Chairperson",
      "General Secretary",
      "Assistant General Secretary",
      "Treasurer",
      "Webmaster",
      "Graphic Designer",
      "Publication Coordinator",
      "Public Relation Coordinator",
      "Member Development Coordinator",
      "Content Development Coordinator",
      "Program Coordinator",
      "Counselor",
      "Volunteer",
      "Other",
    ],
    required: true,
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
    enum: [
      "Electrical & Electronic Engineering",
      "Computer Science & Engineering",
      "Materials Science & Engineering",
      "Information & Communication Engineering",
      "Applied Chemistry & Chemical Engineering",
      "Others",
    ],
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
