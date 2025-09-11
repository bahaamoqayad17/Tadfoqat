"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  User,
  BarChart3,
  Grid3X3,
  Megaphone,
  FileText,
  CreditCard,
  UserCircle,
  Mail,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const t = useTranslations();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const topics = [
    {
      title: "Dashboard",
      icon: <Grid3X3 className="w-5 h-5" />,
      href: "/admin",
    },
    {
      title: "Apps",
      icon: <Settings className="w-5 h-5" />,
      href: "/admin/apps",
    },
    {
      title: "Campaigns",
      icon: <Megaphone className="w-5 h-5" />,
      href: "/admin/campaigns",
    },
    {
      title: "Reports",
      icon: <BarChart3 className="w-5 h-5" />,
      href: "/admin/reports",
      subMenu: [
        {
          title: "Performance",
          href: "/admin/reports/performance",
        },
        {
          title: "Revesal",
          href: "/admin/reports/reversals",
        },
      ],
    },
    {
      title: "Profile",
      icon: <UserCircle className="w-5 h-5" />,
      href: "/admin/profile",
    },
  ];

  const drawer = (
    <div className="h-full flex flex-col">
      <div className="p-6">
        <div className="flex items-center justify-center mb-4">
          <Image
            src="/logo.png"
            alt="Tadfoqat Logo"
            width={120}
            height={40}
            className="h-8 w-auto lg:h-10"
          />
        </div>

        <div className="border-t border-gray-200 my-6"></div>

        <div className="flex flex-col justify-between h-full">
          <div>
            <nav className="space-y-2">
              {topics.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors gap-3"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={handleDrawerToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 right-0 h-full w-80 bg-white border-l border-gray-200 z-50 transform transition-transform duration-300 ease-in-out
        ${mobileOpen ? "translate-x-0" : "translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
      `}
      >
        {drawer}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDrawerToggle}
              className="lg:hidden mr-2"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-3">Bahaa Moqayad</span>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">{children}</div>
      </div>
    </div>
  );
}
