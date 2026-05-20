import { resetQuotaWebhook } from "../services/webhook.js";

export const resetQuota = async (req, res, next) => {
  try {
    const result = await resetQuotaWebhook(req.body);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};
