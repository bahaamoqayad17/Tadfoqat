import React from "react";
import { useTranslations } from "next-intl";
import Title from "./Title";
import Image from "next/image";

export default function HowItWorks() {
  const t = useTranslations();

  const topSteps = [
    { id: "1#", title: t("step1") },
    { id: "2#", title: t("step2") },
    { id: "3#", title: t("step3") },
  ];

  const bottomSteps = [
    { id: "4#", title: t("step4") },
    { id: "5#", title: t("step5") },
    { id: "6#", title: t("step6") },
  ];

  return (
    <section className="py-16 px-4 lg:px-8 bg-white">
      <div className="container mx-auto">
        {/* Main Heading */}
        <Title title={t("howWeWork")} />

        {/* Process Flow Diagram */}
        <div className="">
          {/* Top Row - 3 Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {topSteps.map((step) => (
              <div key={step.id}>
                <div className="bg-white border-1 border-gray-200 max-w-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex gap-2 justify-center items-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {step.title}
                  </h3>

                  <div className="text-green-500 rounded-full flex items-center justify-center text-lg font-black">
                    {step.id}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="relative w-full h-20">
            <Image
              src="/line.png"
              alt="how-it-works"
              fill
              className="object-cover"
            />
          </div>
          {/* Bottom Row - 3 Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:translate-x-16">
            {bottomSteps.map((step) => (
              <div key={step.id} className="text-center">
                <div className="bg-white border-1 border-gray-200 max-w-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex gap-2 justify-center items-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {step.title}
                  </h3>

                  <div className="text-green-500 rounded-full flex items-center justify-center text-lg font-black">
                    {step.id}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Process Flow (Alternative Layout) */}
        <div className="lg:hidden mt-12">
          <div className="space-y-8">
            {[...topSteps, ...bottomSteps].map((step, index) => (
              <div
                key={step.id}
                className="flex items-center space-x-4 rtl:space-x-reverse"
              >
                {/* Step Number */}
                <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {step.id}
                </div>

                {/* Step Title */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {step.title}
                  </h3>
                </div>

                {/* Arrow (except for last step) */}
                {index < topSteps.length + bottomSteps.length - 1 && (
                  <div className="text-primary">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
