"use server";

import { connectToDatabase } from "@/lib/mongo";
import Contact from "@/models/Contact";

export async function createContact(
  name: string,
  email: string,
  subject: string,
  message: string
) {
  try {
    await connectToDatabase();

    await Contact.create({ name, email, subject, message });

    return {
      status: true,
      message: "Contact created successfully",
    };
  } catch (error) {
    console.error("Error getting clients:", error);
    return {
      status: false,
      error: "Internal server error",
      message: "Internal server error",
    };
  }
}

export async function getContacts() {
  try {
    await connectToDatabase();
    const contacts = await Contact.find().sort("-createdAt").lean();
    return contacts;
  } catch (error) {
    console.error("Error getting contacts:", error);
    return [];
  }
}
