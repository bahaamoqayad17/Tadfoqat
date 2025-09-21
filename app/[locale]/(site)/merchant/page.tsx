import React from "react";
import MerchantClient from "./client";
import { getUserFromCookie } from "@/lib/cookie";
import { getInvoicesByMerchantId } from "@/actions/invoice-actions";
import { getUserWallet } from "@/actions/user-actions";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Merchant() {
  try {
    const { user } = await getUserFromCookie();

    if (!user) {
      redirect("/login");
    }

    const { data } = await getInvoicesByMerchantId();
    const { data: wallet } = await getUserWallet();

    return (
      <MerchantClient
        user={user}
        invoices={JSON.parse(JSON.stringify(data))}
        wallet={JSON.parse(JSON.stringify(wallet))}
      />
    );
  } catch (error) {
    redirect("/login");
  }
}
