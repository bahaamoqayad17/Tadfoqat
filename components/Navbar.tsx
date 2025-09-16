"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import ComplainModal from "./modals/ComplainModal";
import ContactModal from "./modals/ContactModal";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Navbar() {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const [isComplainModalOpen, setIsComplainModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const navigationItems = [
    { key: "aboutUs", href: "/about", isModal: false },
    { key: "howWeWork", href: "/how-we-work", isModal: false },
    { key: "contactUs", href: "/contact", isModal: true },
    { key: "ourClients", href: "/clients", isModal: false },
    { key: "complaints", href: "/complaints", isModal: true },
  ];

  const handleNavigationClick = (item: any, e: React.MouseEvent) => {
    if (item.key === "complaints") {
      e.preventDefault();
      setIsComplainModalOpen(true);
    } else if (item.key === "contactUs") {
      e.preventDefault();
      setIsContactModalOpen(true);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-100 px-4 py-3 lg:px-8 lg:py-4 flex items-center justify-center">
      <div className="container flex items-center justify-between flex-1">
        {/* Right Side - Logo */}
        <div className="">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Tadfoqat Logo"
              width={120}
              height={40}
              className="h-8 w-auto lg:h-10 cursor-pointer"
              onClick={() => router.push("/")}
            />
          </div>
        </div>

        {/* Middle - Navigation Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <NavigationMenu key={item.key}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href={item.href}
                    onClick={(e) => handleNavigationClick(item, e)}
                    className="text-gray-700 hover:text-white transition-colors duration-200 font-medium text-sm lg:text-base cursor-pointer"
                  >
                    {t(item.key)}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ))}
        </div>

        {/* Mobile Navigation Menu */}
        <div className="lg:hidden flex justify-center">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-4">
              {navigationItems.slice(0, 3).map((item) => (
                <NavigationMenuItem key={item.key}>
                  <NavigationMenuLink
                    href={item.href}
                    onClick={(e) => handleNavigationClick(item, e)}
                    className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium text-xs cursor-pointer"
                  >
                    {t(item.key)}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center space-x-4">
          {/* a select option to change language */}
          <Select
            onValueChange={(value) => {
              router.push(`/${value}`);
            }}
            defaultValue={locale}
          >
            <SelectTrigger>
              <SelectValue placeholder="Language" className="text-gray-700" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ar">العربية</SelectItem>
            </SelectContent>
          </Select>
          <Button
            className="bg-gradient-to-t from-[#153885] to-primary text-white rounded-lg font-medium text-sm lg:text-base transition-all duration-200 shadow-md hover:shadow-lg"
            size="lg"
            onClick={() => router.push("/login")}
          >
            <ArrowRight className="h-4 w-4" />

            {t("joinNow")}
          </Button>
        </div>
      </div>

      {/* Mobile Expanded Menu */}
      <div className="lg:hidden border-t border-gray-100 mt-3 pt-3">
        <div className="container flex flex-wrap justify-center space-x-4">
          {navigationItems.slice(3).map((item) => (
            <NavigationMenu key={item.key}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href={item.href}
                    onClick={(e) => handleNavigationClick(item, e)}
                    className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium text-xs cursor-pointer"
                  >
                    {t(item.key)}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ))}
        </div>
      </div>

      {/* Complain Modal */}
      <ComplainModal
        isOpen={isComplainModalOpen}
        onClose={() => setIsComplainModalOpen(false)}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </nav>
  );
}
