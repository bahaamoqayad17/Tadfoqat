"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, User, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Login() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<"merchant" | "buyer">("merchant");
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // UI state
  const [isLoading, setIsLoading] = useState(false);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status) {
        // Login successful
        toast.success(t("loginSuccess"));
        // The session cookie is automatically set by the backend
        // Redirect based on user role
        if (data.user.role === "admin") {
          router.push("/admin");
        } else if (data.user.role === "merchant") {
          router.push("/merchant");
        } else {
          router.push("/client");
        }
      } else {
        toast.error(t(data.error) || t("loginFailed"));
      }
    } catch (err) {
      toast.error(t("networkError"));
    } finally {
      setIsLoading(false);
    }
  };
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2 text-right">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 block"
              >
                {t("email")}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border-gray-300 focus:border-primary focus:ring-primary"
                placeholder={t("email")}
                required
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
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="border-gray-300 focus:border-primary focus:ring-primary"
                placeholder={t("password")}
                required
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center space-x-2 text-right">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <Label
                htmlFor="rememberMe"
                className="text-sm text-gray-700 cursor-pointer"
              >
                {t("rememberMe")}
              </Label>
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
                disabled={isLoading}
                className="w-full bg-gradient-to-t from-blue-800 to-blue-600 hover:from-blue-900 hover:to-blue-700 text-white py-3 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
                {isLoading ? t("loggingIn") : t("login")}
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
