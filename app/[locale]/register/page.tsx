"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import MerchantRegister from "@/components/MerchantRegister";
import BuyerRegister from "@/components/BuyerRegister";
import AuthTitle from "@/components/AuthTitle";

export default function Register() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<"merchant" | "buyer">("merchant");
  return (
    <div className="bg-white flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-xl">
        <div className="mb-8">
          <div className="flex border-b border-gray-200">
            {/* Register as Buyer Tab */}
            <button
              onClick={() => setActiveTab("buyer")}
              className={`flex-1 py-3 text-center text-sm font-black transition-colors cursor-pointer ${
                activeTab === "buyer"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t("registerAsBuyer")}
            </button>

            {/* Register as Merchant Tab */}
            <button
              onClick={() => setActiveTab("merchant")}
              className={`flex-1 py-3 text-center text-sm font-black transition-colors cursor-pointer ${
                activeTab === "merchant"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t("registerAsMerchant")}
            </button>
          </div>
        </div>

        <AuthTitle />

        {activeTab === "merchant" && <MerchantRegister />}
        {activeTab === "buyer" && <BuyerRegister />}
      </div>
    </div>
  );
}
