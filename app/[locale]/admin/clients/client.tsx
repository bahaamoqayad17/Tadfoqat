"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import React from "react";

export default function ClientsPage({ data }: { data: any }) {
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
    columnHelper.accessor("mobile_number", {
      header: t("mobile_number"),
      cell: ({ row }) => {
        return <div>{row.original.mobile_number}</div>;
      },
    }),
    columnHelper.accessor("id_number", {
      header: t("id_number"),
      cell: ({ row }) => {
        return <div>{row.original.id_number}</div>;
      },
    }),
    columnHelper.accessor("tax_number", {
      header: t("tax_number"),
      cell: ({ row }) => {
        return <div>{row.original.tax_number}</div>;
      },
    }),
    columnHelper.accessor("bank_iban", {
      header: t("bank_iban"),
      cell: ({ row }) => {
        return <div>{row.original.bank_iban}</div>;
      },
    }),
    columnHelper.accessor("bank_name", {
      header: t("bank_name"),
      cell: ({ row }) => {
        return <div>{row.original.bank_name}</div>;
      },
    }),
    columnHelper.accessor("commercial_number", {
      header: t("commercial_number"),
      cell: ({ row }) => {
        return <div>{row.original.commercial_number}</div>;
      },
    }),
    columnHelper.accessor("isVerified", {
      header: t("verified"),
      cell: ({ row }) => {
        return <div>{row.original.isVerified}</div>;
      },
    }),
    columnHelper.accessor("createdAt", {
      header: t("createdAt"),
      cell: ({ row }) => {
        return <div>{row.original.createdAt}</div>;
      },
    }),
    columnHelper.display({
      id: "actions",
      header: t("actions"),
      cell: (info) => (
        <>
          <Button
            size="sm"
            color="primary"
            variant="outline"
            onClick={() => {}}
            className="mr-2"
          >
            {t("edit")}
          </Button>
          <Button
            size="sm"
            color="destructive"
            variant="outline"
            onClick={() => {}}
            // disabled={isDeleting === info.row.original._id}
          >
            {/* {isDeleting === info.row.original._id ? t("deleting") : t("delete")} */}
            {t("delete")}
          </Button>
        </>
      ),
      enableGlobalFilter: false,
      enableSorting: false,
    }),
  ];
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{t("clients")}</h1>
        <Button color="primary" size="lg" onClick={() => {}}>
          {t("add")}
        </Button>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
