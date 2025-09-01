import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const t = useTranslations();

  return (
    <section className="relative flex items-center overflow-hidden min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Hero-Background.png"
          alt="Hero Background"
          fill
          className="object-contain"
          priority
        />
        {/* Subtle overlay for better text readability */}
        <div className="absolute inset-0 bg-white/5"></div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto relative z-10 px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Right Side - Hero Text */}

          {/* Right Side - Text Content */}
          <div className="">
            {/* Main Heading */}
            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                <span className="block">{t("heroTitle1")}</span>
                <span className="block text-primary">{t("heroTitle2")}</span>
                <span className="block">{t("heroTitle3")}</span>
              </h1>
            </div>

            {/* Description */}
            <div className="mb-12 space-y-2">
              <p className="text-lg lg:text-2xl text-gray-700 leading-relaxed">
                {t("heroDescription1")}
              </p>
              <p className="text-lg lg:text-2xl text-gray-700 leading-relaxed">
                {t("heroDescription2")}
              </p>
              <p className="text-lg lg:text-2xl text-gray-700 leading-relaxed">
                {t("heroDescription3")}
              </p>
              <p className="text-lg lg:text-2xl text-gray-700 leading-relaxed font-semibold">
                {t("heroDescription4")}
              </p>
            </div>

            {/* Call to Action Button */}
            <div className="flex">
              <Button
                className="bg-gradient-to-t from-[#153885] to-primary text-white rounded-lg font-medium text-sm lg:text-base transition-all duration-200 shadow-md hover:shadow-lg"
                size="lg"
              >
                <ArrowRight className="h-4 w-4" />
                {t("startNow")}
              </Button>
            </div>
          </div>

          {/* Left Side - Hero Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-lg lg:max-w-none">
              <Image
                src="/HeroImage.png"
                alt="Hero Illustration"
                width={600}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
