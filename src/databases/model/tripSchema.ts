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
      type: Number, //calculated based on the vehicle type and fuel efficiency
    },
    directEmissions: {
      type: Number,
      default: 0, // calculated based on avoided trips and their estimated emission
    },
    indirectedEmission: {
      type: Number,
      default: 0, //calculated base on avoided trips and their estimated emission
    },
    netEmissions: {
      type: Number,
      default: 0, //caculated  as directEmmissionss - indirectEmmission
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
