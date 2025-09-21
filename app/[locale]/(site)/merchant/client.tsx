"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import ComplaintForm from "@/components/ComplaintForm";
import AddInvoiceModal from "@/components/modals/AddInvoiceModal";
import {
  Plus,
  Search,
  ChevronDown,
  ArrowRight,
  Grid3X3,
  Phone,
  FileText,
  User,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { InvoiceType } from "@/models/Invoice";
import { WalletType } from "@/models/Wallet";
import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

type TabType = "dashboard" | "complaints" | "invoices";

export default function MerchantClient({
  user,
  invoices,
  wallet,
}: {
  user: any;
  invoices: InvoiceType;
  wallet: WalletType;
}) {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [isAddInvoiceModalOpen, setIsAddInvoiceModalOpen] = useState(false);
  const router = useRouter();
  const columnHelper = createColumnHelper<any>();

  // Create columns for the DataTable
  const columns = [
    columnHelper.accessor("_id", {
      header: t("invoiceNumber"),
      cell: ({ row }) => {
        return <div>{row.original?._id as string}</div>;
      },
    }),
    columnHelper.accessor("amount", {
      header: t("amount"),
      cell: ({ row }) => {
        return <div>{row.original.amount}</div>;
      },
    }),
    columnHelper.accessor("client", {
      header: t("customerName"),
      cell: ({ row }) => {
        return <div>{row.original?.client?.name as string}</div>;
      },
    }),
    columnHelper.accessor("createdAt", {
      header: t("date"),
      cell: ({ row }) => {
        return (
          <div>{new Date(row.original.createdAt).toLocaleDateString()}</div>
        );
      },
    }),
    columnHelper.accessor("status", {
      header: t("invoiceStatus"),
      cell: ({ row }) => {
        return (
          <div>
            {row.original.status === "pending" ? (
              <Badge
                variant="error"
                className="cursor-pointer hover:bg-error/70"
              >
                {t("pending")}
              </Badge>
            ) : row.original.status === "completed" ? (
              <Badge
                variant="success"
                className="cursor-pointer hover:bg-success/90"
              >
                {t("completed")}
              </Badge>
            ) : (
              <Badge
                variant="error"
                className="cursor-pointer hover:bg-error/70"
              >
                {t("returned")}
              </Badge>
            )}
          </div>
        );
      },
    }),

    columnHelper.display({
      id: "actions",
      header: t("actions"),
      cell: (info) => (
        <Button variant="outline" size="sm">
          {t("retrieve")}
        </Button>
      ),
      enableGlobalFilter: false,
      enableSorting: false,
    }),
  ];

  const sidebarItems = [
    { id: "dashboard" as TabType, label: t("home"), icon: Grid3X3 },
    { id: "complaints" as TabType, label: t("complaints"), icon: Phone },
    { id: "invoices" as TabType, label: t("invoices"), icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* STATIC ROW - Never changes, always visible */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* User Profile Card */}
          <Card className="">
            <CardContent className="p-6">
              {/* User Info */}
              <div className="flex items-center gap-4">
                <div className="flex justify-between items-center w-full mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex mx-2">
                    <h2 className="text-lg font-semibold">{user?.name}</h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push("/login")}
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="">
                <p className="text-sm">{user?.email}</p>
                <p className="text-sm">{user?.mobile_number}</p>
                <p className="text-sm">
                  {t("commercial_number")} : {user?.commercial_number}
                </p>
              </div>
              {/* Share Button */}
            </CardContent>
          </Card>

          {/* Available Balance Card */}
          <Card
            className="bg-primary text-white flex flex-col justify-center items-center gap-4 rounded-2xl"
            style={{
              backgroundImage: `url(/cloud.svg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">
                {t("availableBalance")}
              </CardTitle>
              <p className="text-white/80 text-sm">
                {t("availableBalanceDesc")}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-4">
                {wallet?.withdrawable_balance || "0"}
              </p>
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                <ArrowRight className="w-4 h-4 mr-2" />
                {t("withdrawBalance")}
              </Button>
            </CardContent>
          </Card>

          {/* Pending Balance Card */}
          <Card
            className="bg-primary text-white flex flex-col justify-center items-center gap-4"
            style={{
              backgroundImage: `url(/cloud.svg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">
                {t("pendingBalance")}
              </CardTitle>
              <p className="text-white/80 text-sm">{t("pendingBalanceDesc")}</p>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{wallet?.balance || "0"}</p>
            </CardContent>
          </Card>

          {/* Add Invoice Card */}
          <Card
            className="border-2 border-dashed border-gray-300 hover:border-primary transition-colors cursor-pointer"
            onClick={() => setIsAddInvoiceModalOpen(true)}
          >
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg">{t("addInvoice")}</h3>
            </CardContent>
          </Card>
        </div>

        {/* DYNAMIC ROW - Changes based on tab selection */}
        <div className="flex gap-6">
          {/* Main Content Area - Left Side (Changes based on tab) */}
          <div className="w-75">
            <Card className="min-h-[300px]">
              <CardContent className="p-6">
                <div className="space-y-2">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-colors cursor-pointer ${
                          activeTab === item.id
                            ? "bg-primary text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex-1 space-y-6">
            {/* Invoice Management Section */}
            {activeTab === "invoices" && (
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex flex-col sm:flex-row gap-4 flex-1">
                      {/* Customer Filter */}
                      <div className="relative">
                        <select
                          value={selectedCustomer}
                          onChange={(e) => setSelectedCustomer(e.target.value)}
                          className="appearance-none border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="">{t("customerName")}</option>
                          <option value="شهد الحمامي">شهد الحمامي</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>

                      {/* Search Input */}
                      <div className="relative flex-1 max-w-md">
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          placeholder={t("searchForInvoice")}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pr-10"
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <DataTable columns={columns} data={invoices} />
                </CardContent>
              </Card>
            )}

            {/* Dashboard Content */}
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                {/* Welcome Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      {t("welcomeBack")}, {user?.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {t("merchantDashboardWelcomeMessage")}
                    </p>
                  </CardContent>
                </Card>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Total Invoices */}
                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            {t("totalInvoices")}
                          </p>
                          <p className="text-2xl font-bold text-blue-600">
                            {invoices?.length || 0}
                          </p>
                        </div>
                        <FileText className="w-8 h-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Completed Invoices */}
                  <Card className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            {t("completedInvoices")}
                          </p>
                          <p className="text-2xl font-bold text-green-600">
                            {invoices?.filter(
                              (inv: any) => inv.status === "completed"
                            )?.length || 0}
                          </p>
                        </div>
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Pending Invoices */}
                  <Card className="border-l-4 border-l-yellow-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            {t("pendingInvoices")}
                          </p>
                          <p className="text-2xl font-bold text-yellow-600">
                            {invoices?.filter(
                              (inv: any) => inv.status === "pending"
                            )?.length || 0}
                          </p>
                        </div>
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Total Revenue */}
                  <Card className="border-l-4 border-l-purple-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            {t("totalRevenue")}
                          </p>
                          <p className="text-2xl font-bold text-purple-600">
                            {invoices?.reduce(
                              (sum: number, inv: any) =>
                                sum + (inv.amount || 0),
                              0
                            ) || 0}
                          </p>
                        </div>
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-500 font-bold">$</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      {t("recentActivity")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {invoices && invoices.length > 0 ? (
                      <div className="space-y-4">
                        {invoices
                          .slice(0, 3)
                          .map((invoice: any, index: number) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-3 h-3 rounded-full ${
                                    invoice.status === "completed"
                                      ? "bg-green-500"
                                      : invoice.status === "pending"
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                  }`}
                                ></div>
                                <div>
                                  <p className="font-medium">
                                    {t("invoiceNumber")}: {invoice._id}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {invoice.client?.name} - {invoice.amount}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">
                                  {invoice.status === "completed"
                                    ? t("completed")
                                    : invoice.status === "pending"
                                    ? t("pending")
                                    : t("returned")}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {new Date(
                                    invoice.createdAt
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        {invoices.length > 3 && (
                          <div className="text-center pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setActiveTab("invoices")}
                            >
                              {t("viewAllInvoices")}
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">{t("noInvoicesYet")}</p>
                        <p className="text-sm text-gray-400 mt-2">
                          {t("noInvoicesDescription")}
                        </p>
                        <Button
                          className="mt-4"
                          onClick={() => setIsAddInvoiceModalOpen(true)}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          {t("addInvoice")}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="w-5 h-5" />
                      {t("quickActions")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button
                        className="h-auto p-4 flex flex-col items-center gap-2"
                        onClick={() => setIsAddInvoiceModalOpen(true)}
                      >
                        <Plus className="w-6 h-6" />
                        <span>{t("addInvoice")}</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-auto p-4 flex flex-col items-center gap-2"
                        onClick={() => setActiveTab("complaints")}
                      >
                        <Phone className="w-6 h-6" />
                        <span>{t("submitComplaint")}</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Complaints Content */}
            {activeTab === "complaints" && <ComplaintForm />}
          </div>

          {/* Sidebar Navigation - Right Side (Always visible) */}
        </div>

        {/* Add Invoice Modal */}
        <AddInvoiceModal
          isOpen={isAddInvoiceModalOpen}
          onClose={() => setIsAddInvoiceModalOpen(false)}
        />
      </div>
    </div>
  );
}
