"use client";

import { DataTable } from "@/components/ui/data-table";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import React from "react";

export default function ContactsPage({ data }: { data: any }) {
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
    columnHelper.accessor("subject", {
      header: t("subject"),
      cell: ({ row }) => {
        return <div>{row.original.subject}</div>;
      },
    }),
    columnHelper.accessor("message", {
      header: t("message"),
      cell: ({ row }) => {
        return <div>{row.original.message}</div>;
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
  ];
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{t("complains")}</h1>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
