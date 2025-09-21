import React from "react";
import ClientPage from "./client";
import { getUserFromCookie } from "@/lib/cookie";
import { getInvoicesByClientId } from "@/actions/invoice-actions";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Client() {
  try {
    const { user } = await getUserFromCookie();

    if (!user) {
      redirect("/login");
    }

    const { data } = await getInvoicesByClientId();
    return (
      <ClientPage user={user} invoices={JSON.parse(JSON.stringify(data))} />
    );
  } catch (error) {
    redirect("/login");
  }
}
