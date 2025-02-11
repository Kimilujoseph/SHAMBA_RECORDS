import mongoose, { Document, Schema, ObjectId } from "mongoose";

interface paymentInterface extends Document {
  tripId: ObjectId;
  passengerId: ObjectId;
  driverId: ObjectId;
  amount: number;
  method: "cash" | "card" | "wallet";
  status: "pending" | "paid" | "failed";
  transactionId: string;
  createdAt: Date;
}

const paymentSchema = new Schema<paymentInterface>({
  tripId: { type: Schema.Types.ObjectId, ref: "trips", required: true },
  passengerId: { type: Schema.Types.ObjectId, ref: "actors", required: true },
  driverId: { type: Schema.Types.ObjectId, ref: "actors", required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ["cash", "card", "wallet"], required: true },
  status: { type: String, enum: ["pending", "paid", "failed"], required: true },
  transactionId: { type: String, required: true },
});

paymentSchema.index({ tripId: 1, passengerId: 1, driverId: 1 });

const payment = mongoose.model<paymentInterface>("payments", paymentSchema);

export { payment, paymentInterface };
