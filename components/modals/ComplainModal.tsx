"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import { createContact } from "@/actions/contact-actions";

interface ComplainModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComplainModal({ isOpen, onClose }: ComplainModalProps) {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    personName: "",
    emailAddress: "",
    problemType: "",
    problemDescription: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.personName.trim()) {
      newErrors.personName = t("required");
    } else if (formData.personName.trim().length < 2) {
      newErrors.personName = t("nameTooShort");
    }

    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = t("required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
      newErrors.emailAddress = t("invalidEmail");
    }

    if (!formData.problemType.trim()) {
      newErrors.problemType = t("required");
    } else if (formData.problemType.trim().length < 3) {
      newErrors.problemType = t("subjectTooShort");
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
    setFormData((prev) => ({ ...prev, [name]: value }));

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
        formData.emailAddress.trim(),
        formData.problemType.trim(),
        formData.problemDescription.trim()
      );
      if (result.status) {
        toast.success(t("complaintSuccess"));
        setFormData({
          personName: "",
          emailAddress: "",
          problemType: "",
          problemDescription: "",
        });
        onClose();
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-4 right-4 w-8 h-8 bg-gray-600 text-white rounded flex items-center justify-center hover:bg-gray-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t("modalTitle")}
          </h2>
          <p className="text-gray-600 text-sm">{t("modalSubtitle")}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Row - Two Fields Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="personName"
                className="text-sm font-medium text-gray-700"
              >
                {t("personName")} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="personName"
                name="personName"
                type="text"
                value={formData.personName}
                onChange={handleInputChange}
                className={`border-green-200 focus:border-green-400 focus:ring-green-400 ${
                  errors.personName ? "border-red-500" : ""
                }`}
                placeholder={t("personName")}
              />
              {errors.personName && (
                <p className="text-sm text-red-600">{errors.personName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="emailAddress"
                className="text-sm font-medium text-gray-700"
              >
                {t("emailAddress")} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="emailAddress"
                name="emailAddress"
                type="email"
                value={formData.emailAddress}
                onChange={handleInputChange}
                className={`border-green-200 focus:border-green-400 focus:ring-green-400 ${
                  errors.emailAddress ? "border-red-500" : ""
                }`}
                placeholder={t("emailAddress")}
              />
              {errors.emailAddress && (
                <p className="text-sm text-red-600">{errors.emailAddress}</p>
              )}
            </div>
          </div>

          {/* Second Row - Problem Type */}
          <div className="space-y-2">
            <Label
              htmlFor="problemType"
              className="text-sm font-medium text-gray-700"
            >
              {t("problemType")} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="problemType"
              name="problemType"
              type="text"
              value={formData.problemType}
              onChange={handleInputChange}
              className={`border-green-200 focus:border-green-400 focus:ring-green-400 ${
                errors.problemType ? "border-red-500" : ""
              }`}
              placeholder={t("problemType")}
            />
            {errors.problemType && (
              <p className="text-sm text-red-600">{errors.problemType}</p>
            )}
          </div>

          {/* Third Row - Problem Description */}
          <div className="space-y-2">
            <Label
              htmlFor="problemDescription"
              className="text-sm font-medium text-gray-700"
            >
              {t("problemDescription")} <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="problemDescription"
              name="problemDescription"
              rows={4}
              value={formData.problemDescription}
              onChange={handleInputChange}
              className={`border-green-200 focus:border-green-400 focus:ring-green-400 resize-none ${
                errors.problemDescription ? "border-red-500" : ""
              }`}
              placeholder={t("problemDescription")}
            />
            {errors.problemDescription && (
              <p className="text-sm text-red-600">
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
              {isSubmitting ? t("sendingComplaint") : t("sendProblem")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
