"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import React from "react";

export default function EmployeesPage({ data }: { data: any }) {
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
    columnHelper.accessor("role", {
      header: t("subject"),
      cell: ({ row }) => {
        return <div>{row.original.role}</div>;
      },
    }),
    columnHelper.accessor("mobile_number", {
      header: t("mobile_number"),
      cell: ({ row }) => {
        return <div>{row.original.phone}</div>;
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
              {t("edit")}
            </Button>
            <Button color="destructive" size="sm" onClick={() => {}}>
              {t("delete")}
            </Button>
          </div>
        );
      },
    }),
  ];
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{t("employees")}</h1>
        <Button color="primary" size="lg" onClick={() => {}}>
          {t("add")}
        </Button>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
