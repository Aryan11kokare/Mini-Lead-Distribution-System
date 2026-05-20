import mongoose, { model, Schema } from "mongoose";

const leadSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
      enum: ["Service 1", "Service 2", "Service 3"],
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// Prevent duplicate leads for same phone + service
leadSchema.index({ phone: 1, service: 1 }, { unique: true });

const Lead = model("Lead", leadSchema);
export default Lead;
