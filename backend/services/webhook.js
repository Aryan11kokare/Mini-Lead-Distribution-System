import Provider from "../models/provider.js";
import ProcessedWebhook from "../models/processedWebhook.js";
import Lead from "../models/lead.js";
import LeadAssignment from "../models/leadAssignment.js";
import AllocationState from "../models/allocationState.js";

export const resetQuotaWebhook = async (payload) => {
  const { webhookId, eventType } = payload;

  // Check if webhook already processed
  const existingWebhook = await ProcessedWebhook.findOne({
    webhookId,
  });

  if (existingWebhook) {
    return {
      alreadyProcessed: true,
      message: "Webhook already processed",
    };
  }

  // Reset quotas
  await Provider.updateMany(
    {},
    {
      usedQuota: 0,
    },
  );

  // DELETE OLD DATA
  await Lead.deleteMany({});

  await LeadAssignment.deleteMany({});

  await AllocationState.deleteMany({});

  // Save webhook record
  await ProcessedWebhook.create({
    webhookId,
    eventType,
  });

  return {
    success: true,
    message: "Quota reset successful",
  };
};
