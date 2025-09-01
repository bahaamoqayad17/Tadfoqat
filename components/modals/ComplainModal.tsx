import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, ArrowRight } from "lucide-react";

interface ComplainModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComplainModal({ isOpen, onClose }: ComplainModalProps) {
  const t = useTranslations();

  if (!isOpen) return null;

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
        <form className="space-y-6">
          {/* First Row - Two Fields Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="personName"
                className="text-sm font-medium text-gray-700"
              >
                {t("personName")}
              </Label>
              <Input
                id="personName"
                type="text"
                className="border-green-200 focus:border-green-400 focus:ring-green-400"
                placeholder={t("personName")}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="emailAddress"
                className="text-sm font-medium text-gray-700"
              >
                {t("emailAddress")}
              </Label>
              <Input
                id="emailAddress"
                type="email"
                className="border-green-200 focus:border-green-400 focus:ring-green-400"
                placeholder={t("emailAddress")}
              />
            </div>
          </div>

          {/* Second Row - Problem Type */}
          <div className="space-y-2">
            <Label
              htmlFor="problemType"
              className="text-sm font-medium text-gray-700"
            >
              {t("problemType")}
            </Label>
            <Input
              id="problemType"
              type="text"
              className="border-green-200 focus:border-green-400 focus:ring-green-400"
              placeholder={t("problemType")}
            />
          </div>

          {/* Third Row - Problem Description */}
          <div className="space-y-2">
            <Label
              htmlFor="problemDescription"
              className="text-sm font-medium text-gray-700"
            >
              {t("problemDescription")}
            </Label>
            <Textarea
              id="problemDescription"
              rows={4}
              className="border-green-200 focus:border-green-400 focus:ring-green-400 resize-none"
              placeholder={t("problemDescription")}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-gradient-to-t from-blue-800 to-blue-600 hover:from-blue-900 hover:to-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-4 h-4" />
              {t("sendProblem")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
