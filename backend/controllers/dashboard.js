import { getDashboardData } from "../services/dashboard.js";

export const getData = async (req, res, next) => {
  try {
    const data = await getDashboardData();
    res.status(201).json({
      success: true,
      data,
    });
  } catch (e) {
    next(e);
  }
};
