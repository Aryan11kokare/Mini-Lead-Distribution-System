import mongoose from "mongoose";
import Lead from "../models/lead.js";
import { allocateLead } from "./allocation.js";

export const createLead = async (payload) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Create lead
    const lead = await Lead.create([payload], { session });

    /**why array [payload]
     When using MongoDB transactions with Mongoose:
     Model.create()
     requires array syntax.**/

    // Allocate providers
    await allocateLead(lead[0], session);

    await session.commitTransaction();
    return lead[0];
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }
};

export const accessLead = async () => {
  return await Lead.find().sort({ createdAt: -1 });
};
