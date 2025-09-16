import React from "react";
import ClientsPage from "./client";
import { getClients } from "@/actions/user-actions";

export default async function Clients() {
  const data = await getClients();

  return <ClientsPage data={JSON.parse(JSON.stringify(data.data))} />;
}
