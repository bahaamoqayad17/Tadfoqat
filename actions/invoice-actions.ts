"use server";

import { connectToDatabase } from "@/lib/mongo";
import Invoice from "@/models/Invoice";

export async function getInvoices() {
  try {
    await connectToDatabase();
    const invoices = await Invoice.find()
      .populate("client")
      .populate("merchant")
      .lean();
    return {
      status: true,
      data: invoices,
    };
  } catch (error) {
    console.error("Error getting invoices:", error);
    return {
      status: false,
      error: "Internal server error",
      data: [],
    };
  }
}
