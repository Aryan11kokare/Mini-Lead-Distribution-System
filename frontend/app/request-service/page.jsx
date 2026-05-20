"use client";

import { useState } from "react";

import api from "@/services/api";

export default function RequestServicePage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    service: "Service 1",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setMessage("");

    try {
      await api.post("/lead", formData);

      setMessage("Lead created successfully");

      setFormData({
        name: "",
        phone: "",
        city: "",
        service: "Service 1",
        description: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-xl">
        <h1 className="text-3xl font-bold mb-6">Request Service</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full border  p-3 rounded"
          >
            <option>Service 1</option>

            <option>Service 2</option>

            <option>Service 3</option>
          </select>

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            rows={4}
          />

          <button
            disabled={loading}
            className="bg-black w-full text-white px-6 py-3 rounded"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {message && <p className="mt-4">{message}</p>}
      </div>
    </div>
  );
}
