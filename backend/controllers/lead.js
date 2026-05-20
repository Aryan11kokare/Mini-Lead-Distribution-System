import { accessLead, createLead } from "../services/lead.js";

export const genrateLead = async (req, res, next) => {
  try {
    const result = await createLead(req.body);
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const getLeads = async (req, res, next) => {
  try {
    const leads = await accessLead();
    res.status(201).json({
      success: true,
      data: leads,
    });
  } catch (e) {
    next(e);
  }
};
