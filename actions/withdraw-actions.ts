"use server";

import { connectToDatabase } from "@/lib/mongo";
import WithdrawRequest from "@/models/WithdrawRequest";

export async function getWithdrawRequests() {
  try {
    await connectToDatabase();
    const withdrawRequests = await WithdrawRequest.find()
      .populate("user")
      .sort("-createdAt")
      .lean();
    return {
      status: true,
      data: withdrawRequests,
    };
  } catch (error) {
    console.error("Error getting withdraw requests:", error);
    return {
      status: false,
      error: "Internal server error",
      data: [],
    };
  }
}
