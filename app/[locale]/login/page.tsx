"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<"merchant" | "buyer">("merchant");
  const router = useRouter();
  return (
    <div className="bg-white flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-xl">
        {/* Header Tabs */}
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

        {/* Main Content */}
        <div className="text-center">
          {/* User Icon */}
          <div className="flex justify-center mb-6">
            <Image src="/profile.png" alt="logo" width={100} height={100} />
          </div>

          {/* Welcome Messages */}
          <div className="mb-8">
            <h1 className="text-xl font-bold text-gray-900 mb-2">
              {t("welcomeTitle")}
            </h1>
            <p className="text-sm text-gray-600">{t("welcomeSubtitle")}</p>
          </div>

          {/* Login Form */}
          <form className="space-y-6">
            {/* Commercial Registration Number Field */}
            <div className="space-y-2 text-right">
              <Label
                htmlFor="registrationNumber"
                className="text-sm font-medium text-gray-700 block"
              >
                {t("commercialRegistrationNumber")}
              </Label>
              <Input
                id="registrationNumber"
                type="text"
                className="border-gray-300 focus:border-primary focus:ring-primary"
                placeholder={t("commercialRegistrationNumber")}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2 text-right">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 block"
              >
                {t("password")}
              </Label>
              <Input
                id="password"
                type="password"
                className="border-gray-300 focus:border-primary focus:ring-primary"
                placeholder={t("password")}
              />
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-start">
              <button
                type="button"
                className="text-sm text-primary hover:text-primary/80 transition-colors cursor-pointer"
              >
                {t("forgotPassword")}
              </button>
            </div>

            {/* Login Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-t from-blue-800 to-blue-600 hover:from-blue-900 hover:to-blue-700 text-white py-3 font-medium flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                {t("login")}
              </Button>
            </div>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 font-bold">
              {t("noAccount")}{" "}
              <button
                className="text-primary hover:text-primary/80 font-bold transition-colors cursor-pointer"
                onClick={() => router.push("/register")}
              >
                {t("createMerchantAccount")}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
