"use client";

import api from "@/services/api";

export default function TestToolsPage() {
  const resetQuota = async () => {
    try {
      const response = await api.post("/webhook/reset-quota", {
        webhookId: Date.now().toString(),

        eventType: "PAYMENT_SUCCESS",
      });

      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="mt-40">
        <h1 className="text-3xl font-bold mb-6">Test Tools</h1>

        <button
          onClick={resetQuota}
          className="bg-black text-white px-6 py-3 rounded"
        >
          Reset Quota
        </button>
      </div>
    </div>
  );
}
