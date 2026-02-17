"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutAction } from "@/actions/auth";
import {
  LayoutDashboard,
  FolderOpen,
  MessageSquareQuote,
  LogOut,
  Menu,
  X,
  ChevronRight,
  User,
  Home,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/dashboard/projects", icon: FolderOpen },
  { label: "Testimonials", href: "/dashboard/testimonials", icon: MessageSquareQuote },
];

export default function DashboardShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await logoutAction();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#0e0d0d] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-[#111] border-r border-white/6 flex flex-col transform transition-all duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "lg:w-20" : "lg:w-72"} w-72`}
      >
        {/* Brand */}
        <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} p-4 border-b border-white/6 h-16`}>
          {collapsed ? (
            <Link href="/dashboard" className="w-10 h-10 rounded-xl bg-[#78F50B] flex items-center justify-center shrink-0">
              <span className="text-black font-bold text-lg">M</span>
            </Link>
          ) : (
            <>
              <Link href="/dashboard" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#78F50B] flex items-center justify-center shrink-0">
                  <span className="text-black font-bold text-lg">M</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Mosud Rahman</p>
                  <p className="text-gray-500 text-xs">Admin Panel</p>
                </div>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {!collapsed && (
            <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider px-3 mb-3">
              Menu
            </p>
          )}
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                title={collapsed ? item.label : undefined}
                className={`flex items-center ${collapsed ? "justify-center" : ""} gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-[#78F50B]/10 text-[#78F50B]"
                    : "text-gray-400 hover:text-white hover:bg-white/4"
                }`}
              >
                <item.icon size={18} className="shrink-0" />
                {!collapsed && (
                  <>
                    <span>{item.label}</span>
                    {isActive && (
                      <ChevronRight size={14} className="ml-auto" />
                    )}
                  </>
                )}
              </Link>
            );
          })}

          {/* Divider */}
          <div className="my-3 border-t border-white/6" />

          {/* Go Home */}
          <Link
            href="/"
            title={collapsed ? "Go to Homepage" : undefined}
            className={`flex items-center ${collapsed ? "justify-center" : ""} gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/4 transition-all duration-200`}
          >
            <Home size={18} className="shrink-0" />
            {!collapsed && <span>Go to Home</span>}
          </Link>
        </nav>

        {/* Collapse toggle (desktop only) */}
        <div className="hidden lg:block p-3 border-t border-white/6">
          <button
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={`flex items-center ${collapsed ? "justify-center" : ""} gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/4 transition-all duration-200`}
          >
            {collapsed ? (
              <PanelLeftOpen size={18} />
            ) : (
              <>
                <PanelLeftClose size={18} />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>

        {/* User / Logout */}
        <div className="p-3 border-t border-white/6">
          {!collapsed && (
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#78F50B]/10 flex items-center justify-center shrink-0">
                <User size={14} className="text-[#78F50B]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium truncate">{email}</p>
                <p className="text-gray-600 text-[10px]">Administrator</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="flex justify-center mb-2">
              <div className="w-8 h-8 rounded-full bg-[#78F50B]/10 flex items-center justify-center" title={email}>
                <User size={14} className="text-[#78F50B]" />
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            title={collapsed ? "Sign Out" : undefined}
            className={`flex items-center ${collapsed ? "justify-center" : ""} gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all`}
          >
            <LogOut size={18} className="shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#0e0d0d]/80 backdrop-blur-xl border-b border-white/6">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-white transition-colors"
              >
                <Menu size={22} />
              </button>
              <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500">
                <LayoutDashboard size={14} />
                <span>/</span>
                <span className="text-white capitalize">
                  {pathname === "/dashboard"
                    ? "Overview"
                    : pathname.split("/").pop()}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-[#78F50B] bg-white/3 hover:bg-[#78F50B]/10 transition-all"
              >
                <Home size={13} />
                <span className="hidden sm:inline">Back to Site</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
