"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import React from "react";

export default function WithdrawalsRequestsPage({ data }: { data: any }) {
  const columnHelper = createColumnHelper<any>();
  const t = useTranslations();

  const columns = [
    columnHelper.accessor("name", {
      header: t("name"),
      cell: ({ row }) => {
        return <div>{row.original.name}</div>;
      },
    }),
    columnHelper.accessor("email", {
      header: t("email"),
      cell: ({ row }) => {
        return <div>{row.original.email}</div>;
      },
    }),
    columnHelper.accessor("amount", {
      header: t("amount"),
      cell: ({ row }) => {
        return <div>{row.original.amount}</div>;
      },
    }),
    columnHelper.accessor("status", {
      header: t("status"),
      cell: ({ row }) => {
        return (
          <div>
            {row.original.status === "pending" ? (
              <Badge variant="warning">{t("pending")}</Badge>
            ) : row.original.status === "approved" ? (
              <Badge variant="success">{t("approved")}</Badge>
            ) : (
              <Badge variant="error">{t("rejected")}</Badge>
            )}
          </div>
        );
      },
    }),
    columnHelper.accessor("createdAt", {
      header: t("createdAt"),
      cell: ({ row }) => {
        return (
          <div>{new Date(row.original.createdAt).toLocaleDateString()}</div>
        );
      },
    }),

    columnHelper.display({
      id: "actions",
      header: t("actions"),
      cell: ({ row }) => {
        return (
          <div className="flex justify-center items-center gap-2">
            <Button color="primary" size="sm" onClick={() => {}}>
              {t("approve")}
            </Button>
            <Button color="destructive" size="sm" onClick={() => {}}>
              {t("reject")}
            </Button>
          </div>
        );
      },
    }),
  ];
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{t("withdrawals_requests")}</h1>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
