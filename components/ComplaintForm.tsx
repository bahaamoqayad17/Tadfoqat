"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight, Phone } from "lucide-react";
import { toast } from "react-toastify";
import { createContact } from "@/actions/contact-actions";

export default function ComplaintForm() {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    personName: "",
    email: "",
    problemTitle: "",
    problemDescription: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.personName.trim()) {
      newErrors.personName = t("required");
    } else if (formData.personName.trim().length < 2) {
      newErrors.personName = t("nameTooShort");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("invalidEmail");
    }

    if (!formData.problemTitle.trim()) {
      newErrors.problemTitle = t("required");
    } else if (formData.problemTitle.trim().length < 3) {
      newErrors.problemTitle = t("subjectTooShort");
    }

    if (!formData.problemDescription.trim()) {
      newErrors.problemDescription = t("required");
    } else if (formData.problemDescription.trim().length < 10) {
      newErrors.problemDescription = t("messageTooShort");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createContact(
        formData.personName.trim(),
        formData.email.trim(),
        formData.problemTitle.trim(),
        formData.problemDescription.trim()
      );

      if (result.status) {
        toast.success(t("complaintSuccess"));
        setFormData({
          personName: "",
          email: "",
          problemTitle: "",
          problemDescription: "",
        });
      } else {
        toast.error(result.message || t("complaintError"));
      }
    } catch (error) {
      console.error("Complaint form error:", error);
      toast.error(t("complaintError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="">
      <CardHeader className="text-center">
        {/* Icon */}
        <div className="flex items-center justify-center w-full">
          <div className="w-20 h-20 bg-[#197BBD] rounded-full flex items-center justify-center">
            <Phone className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {t("modalTitle")}
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-sm">{t("modalSubtitle")}</p>
      </CardHeader>

      <CardContent>
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Row - Two Fields Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="personName"
                className="text-sm font-medium text-gray-700 text-right block"
              >
                {t("personName")} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="personName"
                name="personName"
                type="text"
                value={formData.personName}
                onChange={handleInputChange}
                className={`border-green-200 focus:border-green-400 focus:ring-green-400 text-right bg-white ${
                  errors.personName ? "border-red-500" : ""
                }`}
                placeholder={t("personName")}
              />
              {errors.personName && (
                <p className="text-sm text-red-600 text-right">
                  {errors.personName}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 text-right block"
              >
                {t("emailAddress")} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`border-green-200 focus:border-green-400 focus:ring-green-400 text-right bg-white ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder={t("emailAddress")}
              />
              {errors.email && (
                <p className="text-sm text-red-600 text-right">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Second Row - Problem Title */}
          <div className="space-y-2">
            <Label
              htmlFor="problemTitle"
              className="text-sm font-medium text-gray-700 text-right block"
            >
              {t("problemTitle")} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="problemTitle"
              name="problemTitle"
              type="text"
              value={formData.problemTitle}
              onChange={handleInputChange}
              className={`border-green-200 focus:border-green-400 focus:ring-green-400 text-right bg-white ${
                errors.problemTitle ? "border-red-500" : ""
              }`}
              placeholder={t("problemTitle")}
            />
            {errors.problemTitle && (
              <p className="text-sm text-red-600 text-right">
                {errors.problemTitle}
              </p>
            )}
          </div>

          {/* Third Row - Problem Description */}
          <div className="space-y-2">
            <Label
              htmlFor="problemDescription"
              className="text-sm font-medium text-gray-700 text-right block"
            >
              {t("problemDescription")} <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="problemDescription"
              name="problemDescription"
              value={formData.problemDescription}
              onChange={handleInputChange}
              rows={4}
              className={`border-green-200 focus:border-green-400 focus:ring-green-400 resize-none text-right bg-white ${
                errors.problemDescription ? "border-red-500" : ""
              }`}
              placeholder={t("problemDescription")}
            />
            {errors.problemDescription && (
              <p className="text-sm text-red-600 text-right">
                {errors.problemDescription}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-t from-blue-800 to-blue-600 hover:from-blue-900 hover:to-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <ArrowRight className="w-4 h-4" />
              {isSubmitting ? t("sendingComplaint") : t("sendComplaint")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
