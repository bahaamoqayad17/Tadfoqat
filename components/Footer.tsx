import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Twitter, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-primary text-white py-16 px-4 lg:px-8">
      <div className="container mx-auto text-center">
        {/* Logo Section */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/white-logo.png"
            alt="Tadfoqat"
            width={150}
            height={150}
            className="rounded-lg"
          />
        </div>

        {/* Main Description */}
        <div className="mb-12">
          <p className="text-white/90 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
            {t("footerDescription")}
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="mb-12">
          <div className="flex justify-center items-center space-x-4">
            {/* Twitter/X */}
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition-colors duration-200 cursor-pointer">
              <Twitter className="w-6 h-6 text-gray-800" />
            </div>

            {/* Dribbble */}
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition-colors duration-200 cursor-pointer">
              <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Facebook */}
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition-colors duration-200 cursor-pointer">
              <Facebook className="w-6 h-6 text-gray-800" />
            </div>

            {/* LinkedIn */}
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition-colors duration-200 cursor-pointer">
              <Linkedin className="w-6 h-6 text-gray-800" />
            </div>
          </div>
        </div>
      </div>

      {/* Full-width separator line - extends beyond footer padding */}
      <div className="w-screen h-px bg-white/20 my-8 -mx-4 lg:-mx-8"></div>

      {/* Copyright */}
      <div className="container mx-auto text-center">
        <p className="text-white/80 text-sm">
          © 2025 تدفقات - {t("allRightsReserved")}
        </p>
      </div>
    </footer>
  );
}
