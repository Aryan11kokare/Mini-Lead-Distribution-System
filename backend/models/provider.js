import mongoose, { model, Schema } from "mongoose";

const providerSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    monthlyQuota: {
      type: Number,
      default: 10,
    },
    usedQuota: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Provider = model("Provider", providerSchema);
export default Provider;
