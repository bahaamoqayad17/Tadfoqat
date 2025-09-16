"use server";

import { connectToDatabase } from "@/lib/mongo";
import User from "@/models/User";
import { isAuthenticated, getUserRole } from "@/lib/cookie";

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
    const admin = await User.findOne({ role: "admin" });
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
