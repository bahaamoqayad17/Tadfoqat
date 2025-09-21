"use client";

import { useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  Menu,
  User,
  Grid3X3,
  CreditCard,
  Users,
  ShoppingBag,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const currentPath = useMemo(() => {
    return pathname.replace(`/${locale}`, "");
  }, [pathname, locale]);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const topics = [
    {
      title: "dashboard",
      icon: <Grid3X3 className="w-5 h-5" />,
      href: "/admin",
    },
    {
      title: "clients",
      icon: <User className="w-5 h-5" />,
      href: "/admin/clients",
    },
    {
      title: "employees",
      icon: <Users className="w-5 h-5" />,
      href: "/admin/employees",
    },
    {
      title: "sales",
      icon: <ShoppingBag className="w-5 h-5" />,
      href: "/admin/sales",
    },
    {
      title: "withdrawals_requests",
      icon: <CreditCard className="w-5 h-5" />,
      href: "/admin/withdrawals_requests",
    },
    {
      title: "complains",
      icon: <Phone className="w-5 h-5" />,
      href: "/admin/complains",
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
            className="h-8 w-auto lg:h-10 cursor-pointer"
            onClick={() => router.push("/admin")}
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
                  className={`flex items-center px-3 py-2 text-sm font-bold text-gray-700 rounded-lg hover:bg-gray-100 transition-colors gap-3 ${
                    currentPath === item.href
                      ? "bg-primary text-white hover:bg-primary/90"
                      : ""
                  }`}
                >
                  {item.icon}
                  <span>{t(item.title)}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <html>
      <body>
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

              <div className="flex items-center gap-2">
                {/* <span className="text-sm text-gray-600">Bahaa Moqayad</span> */}
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Page Content */}
            <div className="flex-1 overflow-auto p-6">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
