import Provider from "../models/provider.js";
import LeadAssignment from "../models/leadAssignment.js";

export const getDashboardData = async () => {
  const providers = await Provider.find().sort({ name: 1 });

  const dashboardData = [];

  for (const provider of providers) {
    // Get assignments
    const assignments = await LeadAssignment.find({
      providerId: provider._id,
    })
      .populate("leadId")
      .sort({ createdAt: -1 });

    dashboardData.push({
      providerId: provider._id,

      providerName: provider.name,

      monthlyQuota: provider.monthlyQuota,

      usedQuota: provider.usedQuota,

      remainingQuota: provider.monthlyQuota - provider.usedQuota,

      totalLeads: assignments.length,

      leads: assignments.map((assignment) => assignment.leadId),
    });
  }

  return dashboardData;
};
