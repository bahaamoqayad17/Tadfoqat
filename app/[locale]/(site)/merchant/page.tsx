import React from "react";
import MerchantClient from "./client";
import { getUserFromCookie } from "@/lib/cookie";
import { getInvoicesByMerchantId } from "@/actions/invoice-actions";
import { getUserWallet } from "@/actions/user-actions";

export default async function Merchant() {
  const { user } = await getUserFromCookie();
  const { data } = await getInvoicesByMerchantId();
  const { data: wallet } = await getUserWallet();

  return (
    <MerchantClient
      user={user}
      invoices={JSON.parse(JSON.stringify(data))}
      wallet={wallet}
    />
  );
}
