import { Document, Model, model, models, Schema } from "mongoose";

export interface Event extends Document {
  id: string;
  title: string;
  desc: string;
  date: string;
  image: string;
  slug: string;
  regLink?: string;
}

const EvenSchema = new Schema<Event>({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  date: { type: String, required: true },
  image: { type: String, required: true },
  slug: { type: String, required: true },
  regLink: { type: String },
});

const EventModel =
  (models.Event as Model<Event>) || model<Event>("Event", EvenSchema);

export default EventModel;
