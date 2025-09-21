import React from "react";
import { getInvoices } from "@/actions/invoice-actions";
import SalesPage from "./client";

export default async function Sales() {
  const data = await getInvoices();
  console.log(data);
  return <SalesPage data={JSON.parse(JSON.stringify(data.data))} />;
}
