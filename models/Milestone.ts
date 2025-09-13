import mongoose, { InferSchemaType } from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    amount: {
      type: String,
      trim: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      trim: true,
    },
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      trim: true,
    },
    status: {
      type: String,
      trim: true,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export type InvoiceType = Omit<InferSchemaType<typeof invoiceSchema>, ""> & {
  _id: mongoose.Types.ObjectId | string;
};

const Invoice =
  mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);

export default Invoice;
