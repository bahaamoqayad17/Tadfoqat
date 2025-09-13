import React from "react";
import ClientsPage from "./client";
import { getClients } from "@/actions/user-actions";

export default async function Clients() {
  const data = await getClients();

  console.log(data);

  return <ClientsPage data={data} />;
}
