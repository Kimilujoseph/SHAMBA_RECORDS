import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
    vehicleId: {
      type: mongoose.Types.ObjectId,
      ref: "Vehicles",
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcyle", "bus", "train", "plane"],
    },
    distance: {
      type: Number,
    },
    depatureLocation: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    passengers: {
      type: Number,
      required: true,
    },
    emissionFactor: {
      type: Number,
    },
    directEmissions: {
      type: Number,
      default: 0,
    },
    indirectedEmission: {
      type: Number,
      default: 0,
    },
    netEmissions: {
      type: Number,
      default: 0,
    },
    carbonCreditsAwarded: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const trips = mongoose.model("tripsOperated", tripSchema);

export default trips;
