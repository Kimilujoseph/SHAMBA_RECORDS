import mongoose, { Document, Schema } from "mongoose";

interface UserInterface extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  driverInfo?: {
    licencePicInfront: string;
    licencePicBackWard: string;
    numberPlate: string;
    vehicleId: Object;
  };
  profilePic?: string;
}

const userSchema = new Schema<UserInterface>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    driverInfo: {
      licencePicInfront: { type: String },
      licencePicBackWard: { type: String },
      numberPlate: { type: String },
      vehicleId: { type: Schema.Types.ObjectId, ref: "vehicle" },
    },
  },
  { timestamps: true }
);
userSchema.index({ name: 1, email: 1 });

const user = mongoose.model<UserInterface>("actors", userSchema);

export { user, UserInterface };
