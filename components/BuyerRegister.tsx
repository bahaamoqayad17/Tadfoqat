"use client";

import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BuyerRegister() {
  const t = useTranslations();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log("Selected files:", files);
      // Handle file upload logic here
    }
  };

  return (
    <div className="bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Main Content */}
        <div className="">
          {/* Registration Form */}
          <form className="space-y-6">
            {/* First Row - Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Company Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="companyName"
                  className="text-sm font-medium text-gray-700 block"
                >
                  {t("companyName")}
                </Label>
                <Input
                  id="companyName"
                  type="text"
                  className="border-green-200 focus:border-green-400 focus:ring-green-400"
                  placeholder={t("companyName")}
                />
              </div>

              {/* Commercial Registration Number */}
              <div className="space-y-2">
                <Label
                  htmlFor="commercialRegNumber"
                  className="text-sm font-medium text-gray-700 block"
                >
                  {t("commercialRegistrationNumber")}
                </Label>
                <Input
                  id="commercialRegNumber"
                  type="text"
                  className="border-green-200 focus:border-green-400 focus:ring-green-400"
                  placeholder={t("commercialRegistrationNumber")}
                />
              </div>
            </div>

            {/* Second Row - Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* National ID Number */}
              <div className="space-y-2">
                <Label
                  htmlFor="nationalId"
                  className="text-sm font-medium text-gray-700 block"
                >
                  {t("nationalIdNumber")}
                </Label>
                <Input
                  id="nationalId"
                  type="text"
                  className="border-green-200 focus:border-green-400 focus:ring-green-400"
                  placeholder={t("nationalIdNumber")}
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label
                  htmlFor="phoneNumber"
                  className="text-sm font-medium text-gray-700 block"
                >
                  {t("phoneNumber")}
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  className="border-green-200 focus:border-green-400 focus:ring-green-400"
                  placeholder={t("phoneNumber")}
                />
              </div>
            </div>

            {/* Third Row - Full Width Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 block"
              >
                {t("emailAddress")}
              </Label>
              <Input
                id="email"
                type="email"
                className="border-green-200 focus:border-green-400 focus:ring-green-400"
                placeholder={t("emailAddress")}
              />
            </div>

            {/* File Upload Section */}
            <div className="space-y-2">
              <Label
                htmlFor="fileUpload"
                className="text-sm font-medium text-gray-700 block"
              >
                {t("attachFiles")}
              </Label>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="fileUpload"
              />

              {/* Clickable Upload Area */}
              <div
                onClick={handleFileUploadClick}
                className="border-2 border-dashed border-gray-300 rounded-lg p-2 bg-gray-50 cursor-pointer hover:border-gray-400 hover:bg-gray-100 transition-colors"
              >
                <div className="flex justify-start">
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 pointer-events-none"
                  >
                    {t("chooseFile")}
                  </Button>
                </div>
              </div>
            </div>

            {/* Create Account Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-t from-blue-800 to-blue-600 hover:from-blue-900 hover:to-blue-700 text-white py-3 font-medium flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                {t("createAccount")}
              </Button>
            </div>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 font-bold">
              {t("haveAccount")}{" "}
              <button
                className="text-primary hover:text-primary/80 font-bold transition-colors cursor-pointer underline"
                onClick={() => router.push("/login")}
              >
                {t("merchantLogin")}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
