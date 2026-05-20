import mongoose, { model, Schema } from "mongoose";

const leadAssignmentSchema = new Schema(
  {
    leadId: {
      type: Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },
    providerId: {
      type: Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },
  },
  { timestamps: true },
);

// Prevent same provider getting same lead twice
leadAssignmentSchema.index({ leadId: 1, providerId: 1 }, { unique: true });

const LeadAssign = model("LeadAssign", leadAssignmentSchema);
export default LeadAssign;
