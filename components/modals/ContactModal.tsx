import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { X } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const t = useTranslations();

  if (!isOpen) return null;

  const handleEmailClick = () => {
    window.open("mailto:support@tadfoqat.com", "_blank");
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/966501234567", "_blank");
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
          {/* Phone Icon */}
          <div className="flex justify-center mb-6">
            <Image src="/phone.png" alt="Phone" width={64} height={64} />
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-4 leading-relaxed">
            {t("contactModalTitle")}
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 text-sm">{t("contactModalSubtitle")}</p>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email Card */}
          <div
            onClick={handleEmailClick}
            className="border border-green-200 rounded-xl p-6 text-center cursor-pointer hover:border-green-400 hover:shadow-md transition-all duration-200"
          >
            <div className="flex justify-center mb-4">
              <Image src="/gmail.png" alt="Gmail" width={62} height={48} />
            </div>
            <p className="text-gray-700 font-medium">{t("email")}</p>
          </div>

          {/* WhatsApp Card */}
          <div
            onClick={handleWhatsAppClick}
            className="border border-green-200 rounded-xl p-6 text-center cursor-pointer hover:border-green-400 hover:shadow-md transition-all duration-200"
          >
            <div className="flex justify-center mb-4">
              <Image
                src="/whatsapp.png"
                alt="WhatsApp"
                width={48}
                height={48}
                className="w-12 h-12"
              />
            </div>
            <p className="text-gray-700 font-medium">{t("whatsapp")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
