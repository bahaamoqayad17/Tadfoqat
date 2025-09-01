import React from "react";
import Title from "./Title";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function OurClients() {
  const t = useTranslations();
  return (
    <section className="py-16 px-4 lg:px-8 bg-white">
      <div className="container mx-auto">
        <Title title={t("ourClients")} />
      </div>

      <center>
        <Image src="/client.png" alt="our-clients" width={200} height={200} />
      </center>
    </section>
  );
}
