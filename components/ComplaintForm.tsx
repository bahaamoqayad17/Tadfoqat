"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight, Phone } from "lucide-react";

export default function ComplaintForm() {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    personName: "",
    email: "",
    problemTitle: "",
    problemDescription: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
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
                {t("personName")}
              </Label>
              <Input
                id="personName"
                name="personName"
                type="text"
                value={formData.personName}
                onChange={handleInputChange}
                className="border-green-200 focus:border-green-400 focus:ring-green-400 text-right bg-white"
                placeholder={t("personName")}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 text-right block"
              >
                {t("emailAddress")}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border-green-200 focus:border-green-400 focus:ring-green-400 text-right bg-white"
                placeholder={t("emailAddress")}
              />
            </div>
          </div>

          {/* Second Row - Problem Title */}
          <div className="space-y-2">
            <Label
              htmlFor="problemTitle"
              className="text-sm font-medium text-gray-700 text-right block"
            >
              {t("problemTitle")}
            </Label>
            <Input
              id="problemTitle"
              name="problemTitle"
              type="text"
              value={formData.problemTitle}
              onChange={handleInputChange}
              className="border-green-200 focus:border-green-400 focus:ring-green-400 text-right bg-white"
              placeholder={t("problemTitle")}
            />
          </div>

          {/* Third Row - Problem Description */}
          <div className="space-y-2">
            <Label
              htmlFor="problemDescription"
              className="text-sm font-medium text-gray-700 text-right block"
            >
              {t("problemDescription")}
            </Label>
            <Textarea
              id="problemDescription"
              name="problemDescription"
              value={formData.problemDescription}
              onChange={handleInputChange}
              rows={4}
              className="border-green-200 focus:border-green-400 focus:ring-green-400 resize-none text-right bg-white"
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
              {t("sendComplaint")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
