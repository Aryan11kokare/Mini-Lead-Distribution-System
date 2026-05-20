import Provider from "../models/provider.js";
import LeadAssignment from "../models/leadAssignment.js";
import AllocationState from "../models/allocationState.js";
import allocationRules from "../config/allocationRules.js";
import Lead from "../models/lead.js";

export const allocateLead = async (lead, session) => {
  const serviceRule = allocationRules[lead.service];

  // Get mandatory providers
  const mandatoryProviders = await Provider.find({
    name: {
      $in: serviceRule.mandatoryProviders,
    },
    isActive: true,

    //only providers with remaining quota
    $expr: {
      $lt: ["$usedQuota", "$monthlyQuota"],
    },
  }).session(session);

  // Calculate remaining slots
  const remainingSlots = 3 - mandatoryProviders.length;

  // Get allocation state
  let allocationState = await AllocationState.findOne({
    service: lead.service,
  }).session(session);

  if (!allocationState) {
    allocationState = await AllocationState.create(
      [
        {
          service: lead.service,
          currentIndex: 0,
        },
      ],
      { session },
    );

    allocationState = allocationState[0];
  }

  // Get pool providers
  const poolProviders = await Provider.find({
    name: {
      $in: serviceRule.poolProviders,
    },
    isActive: true,
    $expr: {
      $lt: ["$usedQuota", "$monthlyQuota"],
    },
  })
    .sort({ name: 1 })
    .session(session);

  console.log(poolProviders);

  // Round Fair Selection
  const selectedPoolProviders = [];

  let currentIndex = allocationState.currentIndex;
  console.log(currentIndex);

  let checked = 0;

  while (
    selectedPoolProviders.length < remainingSlots &&
    checked < poolProviders.length
  ) {
    //modulo (%)  creates circular rotation.

    const provider = poolProviders[currentIndex % poolProviders.length];

    // Prevent duplicates
    const alreadySelected = selectedPoolProviders.find(
      (p) => p._id.toString() === provider._id.toString(),
    );

    if (!alreadySelected) {
      selectedPoolProviders.push(provider);
    }

    currentIndex++;
    checked++;
  }

  //combine Providers
  const finalProviders = [...mandatoryProviders, ...selectedPoolProviders];

  // Create assignments
  const assignmentDocs = finalProviders.map((provider) => ({
    leadId: lead._id,
    providerId: provider._id,
  }));

  await LeadAssignment.insertMany(assignmentDocs, { session });

  // Update provider quotas
  for (const provider of finalProviders) {
    provider.usedQuota += 1;
    await provider.save({ session });
  }

  // Save updated round robin index
  if (!poolProviders.length) {
    throw new Error("No providers available");
  }
  allocationState.currentIndex = currentIndex % poolProviders.length;
  await allocationState.save({
    session,
  });

  return finalProviders;
};
