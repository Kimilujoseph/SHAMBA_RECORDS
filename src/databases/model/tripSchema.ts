import mongoose, { Document, Schema, ObjectId } from "mongoose";

interface tripInterface extends Document {
  passengerId: ObjectId;
  driverId: ObjectId;
  vehicleId: ObjectId;
  numberofPassengers: number;
  distance: number;
  startLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  endLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  status: "requested" | "accepted" | "ongoing" | "completed" | "canceled";
  fare: number;
  paymentId?: ObjectId;
  rating?: number;
  createdAt: Date;
}

const tripSchema = new Schema<tripInterface>(
  {
    passengerId: { type: Schema.Types.ObjectId, ref: "actors", requried: true },
    driverId: { type: Schema.Types.ObjectId, ref: "actors", required: true },
    vehicleId: { type: Schema.Types.ObjectId, ref: "vehicles", required: true },
    numberofPassengers: { type: Number, required: true },
    distance: { type: Number, required: true },
    startLocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: { type: String, required: true },
    },
    endLocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ["requested", "accepted", "ongoing", "completed", "canceled"],
      required: true,
    },
    fare: { type: Number, required: true },
    paymentId: { type: Schema.Types.ObjectId, ref: "Payment" },
    rating: { type: Number },
  },
  { timestamps: true }
);

tripSchema.index({ passengerId: 1, vehicleId: 1, driverId: 1 });

const trip = mongoose.model<tripInterface>("trips", tripSchema);

export { trip, tripInterface };
