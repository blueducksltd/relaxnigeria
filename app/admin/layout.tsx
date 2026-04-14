"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Image as ImageIcon,
  Users,
  LogOut,
  Menu,
  X,
  Bell
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

const sidebarItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { name: "Events", icon: Calendar, href: "/admin/events" },
  { name: "Gallery", icon: ImageIcon, href: "/admin/gallery" },
  { name: "Admins", icon: Users, href: "/admin/users", superAdminOnly: true },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Initial check and resize listener
  useEffect(() => {
    const checkViewport = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Close sidebar on navigation on mobile
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  // Don't show layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const userRole = (session?.user as any)?.role;

  return (
    <div className="min-h-screen bg-milk flex">
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-darkgreen/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {(isSidebarOpen || !isMobile) && (
          <motion.aside
            initial={isMobile ? { x: -280 } : undefined}
            animate={{ x: 0 }}
            exit={isMobile ? { x: -280 } : undefined}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed inset-y-0 left-0 w-72 bg-darkgreen border-r border-darkgreen/10 z-50 flex flex-col ${!isSidebarOpen && !isMobile ? "hidden" : ""
              }`}
          >
            <div className="p-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-lightgreen rounded-xl flex items-center justify-center">
                <span className="text-darkgreen font-bold text-xl font-laybar">R</span>
              </div>
              <h1 className="text-milk text-xl font-bold font-laybar">Admin Panel</h1>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
              {sidebarItems.map((item) => {
                if (item.name === "Admins" && userRole !== "super-admin") return null;

                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                      ? "bg-lightgreen text-darkgreen font-bold shadow-lg shadow-lightgreen/10"
                      : "text-milk/70 hover:bg-milk/10 hover:text-milk"
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeBar"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-darkgreen"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-milk/10">
              <button
                onClick={() => signOut()}
                className="w-full flex items-center gap-3 px-4 py-3 text-milk/70 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen && !isMobile ? "lg:pl-72" : "pl-0"}`}>
        <header className="h-20 bg-white border-b border-darkgreen/10 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-milk rounded-lg transition-all text-darkgreen"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h2 className="font-bold text-darkgreen hidden sm:block">
              {sidebarItems.find(i => i.href === pathname)?.name || "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
            <button className="relative p-2 hover:bg-milk rounded-lg transition-all text-darkgreen">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="flex items-center gap-3 sm:gap-4 pl-3 sm:pl-6 border-l border-darkgreen/10">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-darkgreen leading-none">{session?.user?.name || "Admin"}</p>
                <p className="text-[10px] text-darkgreen/50 capitalize mt-1 border border-darkgreen/20 rounded-md px-1.5 inline-block">{userRole || "Editor"}</p>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-darkgreen border-2 border-lightgreen flex items-center justify-center text-milk font-bold text-sm">
                {session?.user?.name?.[0] || "A"}
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
