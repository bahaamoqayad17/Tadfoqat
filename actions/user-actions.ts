"use server";

import { connectToDatabase } from "@/lib/mongo";
import User from "@/models/User";
import { getUserFromCookie } from "@/lib/cookie";
import Wallet from "@/models/Wallet";

export async function getClients() {
  //   const role = await getUserRole();

  //   if (!isAuthenticated() || role !== "admin") {
  //     return {
  //       status: false,
  //       error: "Unauthorized",
  //       data: [],
  //     };
  //   }

  try {
    await connectToDatabase();

    const clients = await User.find({ role: "client" })
      .select("-password")
      .lean();

    return {
      status: true,
      data: clients,
    };
  } catch (error) {
    console.error("Error getting clients:", error);
    return {
      status: false,
      error: "Internal server error",
      data: [],
    };
  }
}

export async function getEmployees() {
  try {
    await connectToDatabase();
    const admin = await User.find({ role: "admin" }).select("-password").lean();
    return {
      status: true,
      data: admin,
    };
  } catch (error) {
    console.error("Error getting admin:", error);
    return {
      status: false,
      error: "Internal server error",
      data: [],
    };
  }
}

export async function getUserWallet() {
  const { user } = await getUserFromCookie();

  if (!user) {
    return {
      status: false,
      error: "Unauthorized",
      data: {},
    };
  }

  try {
    await connectToDatabase();
    const wallet = await Wallet.findOne({ user: user.id })
      .populate("user")
      .lean();
    return {
      status: true,
      data: wallet,
    };
  } catch (error) {
    console.error("Error getting user wallet:", error);
    return {
      status: false,
      error: "Internal server error",
      data: {},
    };
  }
}

export async function toggleUserVerification(userId: string) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ _id: userId }).select("isVerified");

    if (!user) {
      return {
        status: false,
        error: "User not found",
        data: [],
      };
    }

    const currentStatus = user.isVerified;
    const newStatus = !currentStatus;

    await User.updateOne({ _id: userId }, { $set: { isVerified: newStatus } });

    return {
      status: true,
      data: "User verification status updated",
      isVerified: newStatus,
    };
  } catch (error) {
    console.error("Error verifying user:", error);
    return {
      status: false,
      error: "Internal server error",
      data: [],
    };
  }
}
