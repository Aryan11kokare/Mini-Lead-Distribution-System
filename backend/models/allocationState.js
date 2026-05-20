import mongoose, { model, Schema } from "mongoose";

const allocationStateSchema = new Schema(
  {
    service: {
      type: String,
      required: true,
      unique: true,
      enum: ["Service 1", "Service 2", "Service 3"],
    },
    currentIndex: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const AllocationState = model("AllocationState", allocationStateSchema);
export default AllocationState;
