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
    merchant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      trim: true,
    },
    products: [
      {
        id_number: {
          type: String,
          trim: true,
        },
        item_name: {
          type: String,
          trim: true,
        },
        price: {
          type: String,
          trim: true,
        },
        quantity: {
          type: String,
          trim: true,
        },
      },
    ],
    status: {
      type: String,
      trim: true,
      enum: ["pending", "completed", "returned"],
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
