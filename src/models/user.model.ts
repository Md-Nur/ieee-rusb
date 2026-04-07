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
  ieee_id?: string;
  society_designations?: { society: string; designation: string }[];
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
}

const UserSchema = new Schema<Users>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  linkedin: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    default: [],
    index: true,
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
      "Counselor",
      "Advisor",
      "Senior Member",
      "Alumni",
      "Chairperson",
      "Vice Chairperson",
      "General Secretary",
      "Assistant General Secretary",
      "Treasurer",
      "Webmaster",
      "Program Coordinator",
      "Graphic Designer",
      "Content Development",
      "Membership Development",
      "Public Relation Coordinator",
      "Photographer",
      "Publication Coordinator",
      "Volunteer",
      "Social Media Coordinator",
      "Speaker",
      "Other",
    ],
    required: true,
    index: true,
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
    index: true,
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
    trim: true,
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
    trim: true,
  },
  ieee_id: {
    type: String,
    required: false,
    unique: true,
    index: true,
    sparse: true,
    trim: true,
  },
  society_designations: {
    type: [{ society: String, designation: String }],
    default: [],
  },
  forgotPasswordToken: {
    type: String,
  },
  forgotPasswordTokenExpiry: {
    type: Date,
  },
});

const UserModel =
  (models.User as Model<Users>) || model<Users>("User", UserSchema);

export default UserModel;
