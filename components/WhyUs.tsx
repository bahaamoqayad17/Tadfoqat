import React from "react";
import { useTranslations } from "next-intl";
import PeopleIcon from "@/icons/People";
import CloudIcon from "@/icons/CloudIcon";
import PaymentIcon from "@/icons/PaymentIcon";
import Title from "./Title";

export default function WhyUs() {
  const t = useTranslations();

  const features = [
    {
      icon: <PaymentIcon />,
      title: t("flexiblePayment"),
      description: t("flexiblePaymentDesc"),
      gradient: "from-[#56C1E2] to-[#2050A3]",
    },

    {
      icon: <CloudIcon />,
      title: t("secureRegistration"),
      description: t("secureRegistrationDesc"),
      gradient: "from-[#38EF7D] to-[#11998E]",
    },
    {
      icon: <PeopleIcon />,
      title: t("availableAnyTime"),
      description: t("availableAnyTimeDesc"),
      gradient: "from-[#FEB47B] to-[#FF7E5F]",
    },
  ];

  return (
    <section className="py-16 px-4 lg:px-8 bg-white">
      <div className="container mx-auto">
        {/* Main Heading */}
        <Title title={t("whyUs")} />

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-gradient-to-b ${feature.gradient} flex flex-col items-center justify-center gap-4 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center backdrop-blur-sm">
                <div className="w-8 h-8">{feature.icon}</div>
              </div>

              {/* Title */}
              <h3 className="text-xl lg:text-2xl font-black text-center leading-tight">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-white/90 text-sm lg:text-md font-bold leading-relaxed text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
