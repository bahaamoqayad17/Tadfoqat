"use client";

import React, { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function MerchantRegister() {
  const t = useTranslations();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_number: "",
    password: "",
    id_number: "",
    tax_number: "",
    bank_iban: "",
    bank_name: "",
    commercial_number: "",
    documents: [] as File[],
    role: "merchant",
  });

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    // Validate step 1 fields
    if (
      !formData.name ||
      !formData.commercial_number ||
      !formData.id_number ||
      !formData.tax_number ||
      !formData.bank_name ||
      !formData.bank_iban
    ) {
      toast.error(t("requiredFieldsMissing"));
      return;
    }
    setCurrentStep(2);
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        documents: [...prev.documents, ...fileArray],
      }));
    }
  };

  const handleCreateAccount = async () => {
    // Validate step 2 fields
    if (!formData.email || !formData.mobile_number || !formData.password) {
      toast.error(t("requiredFieldsMissing"));
      return;
    }

    if (formData.password.length < 6) {
      toast.error(t("passwordTooShort"));
      return;
    }

    setIsLoading(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("mobile_number", formData.mobile_number);
      submitData.append("password", formData.password);
      submitData.append("id_number", formData.id_number);
      submitData.append("tax_number", formData.tax_number);
      submitData.append("bank_iban", formData.bank_iban);
      submitData.append("bank_name", formData.bank_name);
      submitData.append("commercial_number", formData.commercial_number);
      submitData.append("role", formData.role);

      // Append files
      formData.documents.forEach((file, index) => {
        submitData.append(`documents`, file);
      });

      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: submitData,
      });

      const data = await response.json();

      if (data.status) {
        toast.success(t("registrationSuccess"));
        // Redirect based on user role
        // if (data.user.role === "admin") {
        //   router.push("/admin");
        // } else if (data.user.role === "merchant") {
        //   router.push("/merchant");
        // } else {
        //   router.push("/client");
        // }
      } else {
        toast.error(t(data.error) || t("registrationFailed"));
      }
    } catch (err) {
      toast.error(t("networkError"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    router.push("/login");
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
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                    placeholder={t("companyName")}
                    required
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
                    name="commercial_number"
                    type="text"
                    value={formData.commercial_number}
                    onChange={handleInputChange}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                    placeholder={t("commercialRegistrationNumber")}
                    required
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
                    name="id_number"
                    type="text"
                    value={formData.id_number}
                    onChange={handleInputChange}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                    placeholder={t("nationalIdNumber")}
                    required
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
                    name="tax_number"
                    type="text"
                    value={formData.tax_number}
                    onChange={handleInputChange}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                    placeholder={t("taxNumber")}
                    required
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
                    name="bank_name"
                    type="text"
                    value={formData.bank_name}
                    onChange={handleInputChange}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                    placeholder={t("bankName")}
                    required
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
                    name="bank_iban"
                    type="text"
                    value={formData.bank_iban}
                    onChange={handleInputChange}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                    placeholder={t("companyIbanAccountNumber")}
                    required
                  />
                </div>
              </div>

              {/* Next Button */}
              <div className="pt-4">
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-t from-blue-800 to-blue-600 hover:from-blue-900 hover:to-blue-700 text-white py-3 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  name="mobile_number"
                  type="tel"
                  value={formData.mobile_number}
                  onChange={handleInputChange}
                  className="border-green-200 focus:border-green-400 focus:ring-green-400"
                  placeholder={t("phoneNumber")}
                  required
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
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border-gray-300 focus:border-primary focus:ring-primary"
                  placeholder={t("emailAddress")}
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700 block"
                >
                  {t("password")}
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="border-gray-300 focus:border-primary focus:ring-primary"
                  placeholder={t("password")}
                  required
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

                {/* Show the document names that are uploaded */}
                {formData.documents.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-2">
                      Uploaded files:
                    </p>
                    {formData.documents.map((document, index) => (
                      <p
                        key={index}
                        className="text-sm text-gray-500 bg-gray-50 p-2 rounded"
                      >
                        {document.name}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Create Account Button */}
              <div className="pt-4">
                <Button
                  type="button"
                  onClick={handleCreateAccount}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-t from-blue-800 to-blue-600 hover:from-blue-900 hover:to-blue-700 text-white py-3 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                  {isLoading ? t("creatingAccount") : t("createAccount")}
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
