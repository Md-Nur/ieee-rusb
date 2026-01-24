import { Document, Model, model, models, Schema } from "mongoose";

export interface Content extends Document {
  title: string;
  content: string;
  date: string;
  type: string;
  thumbnail: string;
  slug: string;
  regUrl?: string;
  tags?: string[];
  userId: string;
  society?: string;
  societyId?: string;
  societySlug?: string;
  isApproved: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const ContentSchema = new Schema<Content>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ["blog", "event"], required: true },
  date: { type: String, required: true },
  thumbnail: { type: String, required: true },
  slug: { type: String, required: true },
  regUrl: { type: String },
  tags: { type: [String] },
  userId: { type: String, ref: "User", required: true },
  society: {
    type: String,
    enum: [
      "robotics-&-automation-society",
      "signal-processing-society",
      "power-&-energy-society",
      "computer-society",
      "antenna-&-propagation-society",
      "women-in-engineering-society",
      "main",
    ],
    default: "main",
  },
  societyId: { type: String },
  societySlug: { type: String },
  isApproved: { type: Boolean, default: false },
}, { timestamps: true });

const ContentModel =
  (models.Content as Model<Content>) ||
  model<Content>("Content", ContentSchema);

export default ContentModel;
