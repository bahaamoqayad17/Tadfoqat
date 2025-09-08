"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { createInvoiceColumns, Invoice } from "@/components/invoice-columns";
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

// Mock data for invoices
const mockInvoices: Invoice[] = [
  {
    id: "0533669845232",
    amount: "1213133",
    customerName: "شهد الحمامي",
    date: "22*6*2001",
    status: "pending",
  },
  {
    id: "0533669845233",
    amount: "1213134",
    customerName: "شهد الحمامي",
    date: "23*6*2001",
    status: "completed",
  },
  {
    id: "0533669845234",
    amount: "1213135",
    customerName: "شهد الحمامي",
    date: "24*6*2001",
    status: "returned",
  },
  {
    id: "0533669845235",
    amount: "1213136",
    customerName: "شهد الحمامي",
    date: "25*6*2001",
    status: "pending",
  },
];

type TabType = "dashboard" | "complaints" | "invoices";

export default function MerchantClient() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [isAddInvoiceModalOpen, setIsAddInvoiceModalOpen] = useState(false);
  const router = useRouter();
  // Create columns for the DataTable
  const columns = createInvoiceColumns(t);

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

                  <div className="flex flex-col">
                    <h2 className="text-lg font-semibold">شهد الحمامي</h2>
                    <p className="text-sm text-muted-foreground">
                      {t("informationSecurityEngineer")}
                    </p>
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
                <p className="text-sm">shahedhamami1@gmail.com</p>
                <p className="text-sm">+972567040582</p>
                <p className="text-sm">{t("techCompanyForMobileTrading")}</p>
                <p className="text-sm">سجل تجاري : 000000000000</p>
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
              <p className="text-2xl font-bold mb-4">2.22 000...00</p>
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
              <p className="text-2xl font-bold">2.22 000...00</p>
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
                  <DataTable columns={columns} data={mockInvoices} />
                </CardContent>
              </Card>
            )}

            {/* Dashboard Content */}
            {activeTab === "dashboard" && (
              <Card>
                <CardHeader>
                  <CardTitle>{t("dashboard")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Welcome to your merchant dashboard. Select a tab from the
                    sidebar to manage your invoices and complaints.
                  </p>
                </CardContent>
              </Card>
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
