import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import Title from "./Title";

export default function Aboutus() {
  const t = useTranslations();

  return (
    <section className="py-16 px-4 lg:px-8 bg-gray-50">
      <div className="flex justify-center items-center">
        <Title title={t("whoWeAre")} />
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <div className="relative">
            <Image
              src="/About.png"
              alt="About Us"
              width={600}
              height={400}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            {/* Description */}
            <div className="text-center lg:text-right">
              <p className="text-lg lg:text-2xl text-gray-700 leading-relaxed">
                {t("aboutUsDescription")}
              </p>
            </div>

            {/* Contact Button */}
            <div className="flex justify-end">
              <Button
                className="bg-gradient-to-t from-[#153885] to-primary text-white rounded-lg font-medium text-sm lg:text-base transition-all duration-200 shadow-md hover:shadow-lg"
                size="lg"
              >
                {t("contactUsBtn")}
                &nbsp;
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
