import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AuthTitle() {
  const t = useTranslations();
  return (
    <div className="flex flex-col justify-center items-center">
      {/* User Icon */}
      <div className="flex justify-center mb-6">
        <Image src="/profile.png" alt="logo" width={100} height={100} />
      </div>

      {/* Welcome Messages */}
      <div className="mb-8 text-center">
        <h1 className="text-xl font-bold text-gray-900 mb-2">
          {t("welcomeTitle")}
        </h1>
        <p className="text-sm text-gray-600">{t("welcomeSubtitle")}</p>
      </div>
    </div>
  );
}
