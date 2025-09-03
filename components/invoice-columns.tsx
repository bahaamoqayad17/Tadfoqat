"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

// Invoice type definition
export interface Invoice {
  id: string;
  amount: string;
  customerName: string;
  date: string;
  status: "pending" | "completed" | "returned";
}

// Status color helper function
const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "returned":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

// Status text helper function
const getStatusText = (status: string, t: any) => {
  switch (status) {
    case "pending":
      return t("pending");
    case "completed":
      return t("completed");
    case "returned":
      return t("returned");
    default:
      return status;
  }
};

// Columns definition
export const createInvoiceColumns = (t: any): ColumnDef<Invoice>[] => [
  {
    accessorKey: "id",
    header: t("invoiceNumber"),
  },
  {
    accessorKey: "amount",
    header: t("amount"),
  },
  {
    accessorKey: "customerName",
    header: t("customerName"),
  },
  {
    accessorKey: "date",
    header: t("date"),
  },
  {
    accessorKey: "status",
    header: t("invoiceStatus"),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
            status
          )}`}
        >
          {getStatusText(status, t)}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <Button variant="outline" size="sm">
          {t("retrieve")}
        </Button>
      );
    },
  },
];
