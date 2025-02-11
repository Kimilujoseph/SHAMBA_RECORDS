import mongoose, { Document, Schema, ObjectId } from "mongoose";

interface IReview extends Document {
  tripId: ObjectId;
  passengerId: ObjectId;
  driverId: ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    tripId: { type: Schema.Types.ObjectId, ref: "trips", required: true },
    passengerId: { type: Schema.Types.ObjectId, ref: "actors", required: true },
    driverId: { type: Schema.Types.ObjectId, ref: "actors", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: false },
  },
  { timestamps: true }
);

const Review = mongoose.model<IReview>("Review", ReviewSchema);
export { Review, IReview };
