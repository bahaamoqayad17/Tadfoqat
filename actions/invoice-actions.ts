"use server";

import { connectToDatabase } from "@/lib/mongo";
import Invoice from "@/models/Invoice";
import { getUserFromCookie } from "@/lib/cookie";
import User from "@/models/User";

export async function getInvoices() {
  try {
    await connectToDatabase();
    const invoices = await Invoice.find()
      .populate("client")
      .populate("merchant")
      .sort("-createdAt")
      .lean();
    return {
      status: true,
      data: invoices,
    };
  } catch (error) {
    console.error("Error getting invoices:", error);
    return {
      status: false,
      error: "internalServerError",
      data: [],
    };
  }
}

export async function getInvoicesByClientId() {
  const { user } = await getUserFromCookie();
  if (!user) {
    return {
      status: false,
      error: "unauthorized",
      data: [],
    };
  }

  try {
    await connectToDatabase();
    const invoices = await Invoice.find({ client: user.id })
      .populate("client")
      .populate("merchant")
      .sort("-createdAt")
      .lean();
    return {
      status: true,
      data: invoices,
    };
  } catch (error) {
    console.error("Error getting invoices:", error);
    return {
      status: false,
      error: "internalServerError",
      data: [],
    };
  }
}

export async function getInvoicesByMerchantId() {
  const { user } = await getUserFromCookie();
  if (!user) {
    return {
      status: false,
      error: "unauthorized",
      data: [],
    };
  }

  try {
    await connectToDatabase();
    const invoices = await Invoice.find({ client: user.id })
      .populate("client")
      .populate("merchant")
      .sort("-createdAt")
      .lean();
    return {
      status: true,
      data: invoices,
    };
  } catch (error) {
    console.error("Error getting invoices:", error);
    return {
      status: false,
      error: "internalServerError",
      data: [],
    };
  }
}

export default async function createInvoice(data: any, mobileNumber: string) {
  const { user } = await getUserFromCookie();
  try {
    await connectToDatabase();
    const client = await User.findOne({
      mobile_number: mobileNumber,
      role: "client",
    });

    if (!client) {
      return {
        status: false,
        error: "clientNotFound",
        data: [],
      };
    }

    const newInvoice = await Invoice.create({
      ...data,
      merchant: user!.id,
      client: client._id,
    });

    return {
      status: true,
      data: newInvoice,
    };
  } catch (error) {
    console.error("Error creating invoice:", error);
    return {
      status: false,
      error: "internalServerError",
      data: [],
    };
  }
}
