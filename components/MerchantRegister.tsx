"use client";

import React, { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MerchantRegister() {
  const t = useTranslations();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handleCreateAccount = () => {
    // Handle account creation logic here
    console.log("Creating account...");
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

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
        {/* Registration Form */}
        <form className="space-y-6">
          {currentStep === 1 ? (
            // Step 1: Company Information
            <>
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

                {/* Tax Number */}
                <div className="space-y-2">
                  <Label
                    htmlFor="taxNumber"
                    className="text-sm font-medium text-gray-700 block"
                  >
                    {t("taxNumber")}
                  </Label>
                  <Input
                    id="taxNumber"
                    type="text"
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                    placeholder={t("taxNumber")}
                  />
                </div>
              </div>

              {/* Third Row - Two Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Bank Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="bankName"
                    className="text-sm font-medium text-gray-700 block"
                  >
                    {t("bankName")}
                  </Label>
                  <Input
                    id="bankName"
                    type="text"
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                    placeholder={t("bankName")}
                  />
                </div>

                {/* Company IBAN Account Number */}
                <div className="space-y-2">
                  <Label
                    htmlFor="ibanAccount"
                    className="text-sm font-medium text-gray-700 block"
                  >
                    {t("companyIbanAccountNumber")}
                  </Label>
                  <Input
                    id="ibanAccount"
                    type="text"
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                    placeholder={t("companyIbanAccountNumber")}
                  />
                </div>
              </div>

              {/* Next Button */}
              <div className="pt-4">
                <Button
                  type="button"
                  onClick={handleNext}
                  className="w-full bg-gradient-to-t from-blue-800 to-blue-600 hover:from-blue-900 hover:to-blue-700 text-white py-3 font-medium flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" />
                  {t("next")}
                </Button>
              </div>
            </>
          ) : (
            // Step 2: Contact Information and Files
            <>
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

              {/* Email Address */}
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
                  className="border-gray-300 focus:border-primary focus:ring-primary"
                  placeholder={t("emailAddress")}
                />
              </div>

              {/* File Upload Section */}
              <div className="space-y-2">
                <Label
                  htmlFor="fileUpload"
                  className="text-sm font-medium text-gray-700 block"
                >
                  {t("attachFilesStep2")}
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
                  type="button"
                  onClick={handleCreateAccount}
                  className="w-full bg-gradient-to-t from-blue-800 to-blue-600 hover:from-blue-900 hover:to-blue-700 text-white py-3 font-medium flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" />
                  {t("createAccount")}
                </Button>
              </div>
            </>
          )}
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            {t("haveAccount")}{" "}
            <button
              className="text-primary hover:text-primary/80 font-medium transition-colors cursor-pointer"
              onClick={handleLoginClick}
            >
              {t("merchantLogin")}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
