import { Document, Model, model, models, Schema } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  roles: string[];
  isAdmin: boolean;
  societies: string[];
  isApproved: boolean;
}

const UserSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
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
});

const UserModel =
  (models.User as Model<User>) || model<User>("User", UserSchema);

export default UserModel;
