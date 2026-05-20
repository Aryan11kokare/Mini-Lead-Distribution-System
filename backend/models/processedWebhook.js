import mongoose, { model, Schema } from "mongoose";

const processedWebhookSchema = new Schema(
  {
    webhookId: {
      type: String,
      required: true,
      unique: true,
    },
    eventType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const ProcessedWebhook = model("ProcessedWebhook", processedWebhookSchema);
export default ProcessedWebhook;
