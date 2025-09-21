import React from "react";
import ClientPage from "./client";
import { getUserFromCookie } from "@/lib/cookie";
import { getInvoicesByClientId } from "@/actions/invoice-actions";

export default async function Client() {
  const { user } = await getUserFromCookie();
  const { data } = await getInvoicesByClientId();
  return <ClientPage user={user} invoices={JSON.parse(JSON.stringify(data))} />;
}
