"use client";

import ChartPieInteractive from "@/components/PieChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { CardTitle } from "@/components/ui/card";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import React from "react";
import { Users, FileText, CreditCard, DollarSign } from "lucide-react";

export default function SalesPage({ data }: { data: any }) {
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
        <h1 className="text-2xl font-bold">{t("sales")}</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
        {/* Total Clients Card */}
        <Card className="border-l-4 border-l-black">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {/*  translate the word الاموال المتعثرة بالسداد */}
              {t("totalBlockedAmount")}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-black" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">7,573</div>
            <p className="text-xs text-gray-500">+10% {t("fromLastMonth")}</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t("totalClients")}
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">1,234</div>
            <p className="text-xs text-gray-500">+12% {t("fromLastMonth")}</p>
          </CardContent>
        </Card>

        {/* Total Invoices Card */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t("totalInvoices")}
            </CardTitle>
            <FileText className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">856</div>
            <p className="text-xs text-gray-500">+8% {t("fromLastMonth")}</p>
          </CardContent>
        </Card>

        {/* Total Payments Card */}
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t("totalPayments")}
            </CardTitle>
            <CreditCard className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">642</div>
            <p className="text-xs text-gray-500">+15% {t("fromLastMonth")}</p>
          </CardContent>
        </Card>

        {/* Total Payments Card */}
        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t("totalmerchants")}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">642</div>
            <p className="text-xs text-gray-500">+15% {t("fromLastMonth")}</p>
          </CardContent>
        </Card>
      </div>

      <ChartPieInteractive />

      <DataTable columns={columns} data={data} />
    </div>
  );
}
