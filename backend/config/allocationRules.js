const allocationRules = {
  "Service 1": {
    mandatoryProviders: ["Provider 1"],
    poolProviders: ["Provider 2", "Provider 3", "Provider 4"],
  },

  "Service 2": {
    mandatoryProviders: ["Provider 5"],
    poolProviders: ["Provider 6", "Provider 7", "Provider 8"],
  },

  "Service 3": {
    mandatoryProviders: ["Provider 1", "Provider 4"],
    poolProviders: [
      "Provider 2",
      "Provider 3",
      "Provider 5",
      "Provider 6",
      "Provider 7",
      "Provider 8",
    ],
  },
};

export default allocationRules;
