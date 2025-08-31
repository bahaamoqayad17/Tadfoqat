import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const t = useTranslations();

  const navigationItems = [
    { key: "complaints", href: "/complaints" },
    { key: "ourClients", href: "/clients" },
    { key: "contactUs", href: "/contact" },
    { key: "howWeWork", href: "/how-we-work" },
    { key: "aboutUs", href: "/about" },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 px-4 py-3 lg:px-8 lg:py-4 flex items-center justify-center">
      <div className="container flex items-center justify-between flex-1">
        {/* Left Side - Join Now Button */}
        <div className="">
          <Button
            className="bg-gradient-to-t from-[#153885] to-primary text-white rounded-lg font-medium text-sm lg:text-base transition-all duration-200 shadow-md hover:shadow-lg"
            size="lg"
          >
            {t("joinNow")}
            &nbsp;
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Middle - Navigation Menu */}
        <div className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
          {navigationItems.map((item) => (
            <NavigationMenu key={item.key}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href={item.href}
                    className="text-gray-700 hover:text-white transition-colors duration-200 font-medium text-sm lg:text-base"
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
            <NavigationMenuList className="flex space-x-4 rtl:space-x-reverse">
              {navigationItems.slice(0, 3).map((item) => (
                <NavigationMenuItem key={item.key}>
                  <NavigationMenuLink
                    href={item.href}
                    className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium text-xs"
                  >
                    {t(item.key)}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Side - Logo */}
        <div className="">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Tadfoqat Logo"
              width={120}
              height={40}
              className="h-8 w-auto lg:h-10"
            />
          </div>
        </div>
      </div>

      {/* Mobile Expanded Menu */}
      <div className="lg:hidden border-t border-gray-100 mt-3 pt-3">
        <div className="container flex flex-wrap justify-center space-x-4 rtl:space-x-reverse">
          {navigationItems.slice(3).map((item) => (
            <NavigationMenu key={item.key}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href={item.href}
                    className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium text-xs"
                  >
                    {t(item.key)}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ))}
        </div>
      </div>
    </nav>
  );
}
