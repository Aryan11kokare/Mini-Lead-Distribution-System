"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

export default function DashboardPage() {
  const [providers, setProviders] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard");

      setProviders(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();

    // REALTIME POLLING
    // const interval = setInterval(() => {
    //   fetchDashboard();
    // }, 3000);

    // return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Provider Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {providers?.map((provider) => (
          <div key={provider?.providerId} className="border rounded p-4">
            <h2 className="text-xl font-bold">{provider?.providerName}</h2>

            <p>Remaining Quota: {provider?.remainingQuota}</p>

            <p>Total Leads: {provider?.totalLeads}</p>

            <div className="mt-4">
              <h3 className="font-semibold">Leads</h3>

              <div className="space-y-2 mt-2">
                {provider?.leads?.map((lead) => (
                  <div key={lead?._id} className="border p-2 rounded">
                    <p>{lead?.name}</p>

                    <p>{lead?.phone}</p>

                    <p>{lead?.service}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
