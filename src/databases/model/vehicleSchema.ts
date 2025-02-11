import mongoose, { Document, Schema, ObjectId } from "mongoose";

enum status {
  active = "active",
  inactive = "inactive",
  onride = "onride",
}

interface VehicleInterface extends Document {
  driverId: ObjectId;
  name: string;
  year: number;
  vehicleModel: string;
  status: status;
  licence: string;
  color: string;
  images: string[];
}

const vehicleSchema = new Schema<VehicleInterface>({
  driverId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  name: { type: String, required: true },
  year: { type: Number, required: true },
  vehicleModel: { type: String, required: true },
  status: { type: String, enum: Object.values(status), required: true },
  licence: { type: String, required: true },
  color: { type: String, required: true },
  images: [{ type: String }],
});
//index the database
vehicleSchema.index({
  driverId: 1,
  name: 1,
  model: 1,
  status: 1,
  licence: 1,
  color: 1,
});

const vehicle = mongoose.model<VehicleInterface>("vehicles", vehicleSchema);

export { vehicle, VehicleInterface };
