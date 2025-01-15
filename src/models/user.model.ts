import { Document, Model, model, models, Schema } from "mongoose";

export interface Users extends Document {
  name: string;
  email: string;
  avatar: string;
  phone: string;
  password: string;
  roles: string[];
  isAdmin: boolean;
  societies: string[];
  isApproved: boolean;
  dept: string;
  session: string;
}

const UserSchema = new Schema<Users>({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "",
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
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  societies: {
    type: [String],
    default: [],
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  dept: {
    type: String,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
});

const UserModel =
  (models.User as Model<Users>) || model<Users>("User", UserSchema);

export default UserModel;
