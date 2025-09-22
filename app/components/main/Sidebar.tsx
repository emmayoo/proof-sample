"use client";

import {
  LayoutDashboard,
  Calendar,
  Users,
  BarChart3,
  BookOpen,
  FileText,
  MessageCircle,
  DollarSign,
  FolderOpen,
  Settings,
  LogOut,
  X,
} from "lucide-react";

interface SidebarProps {
  activeItem?: string;
  onClose?: () => void;
  isMobile?: boolean;
}

export function Sidebar({
  activeItem = "Dashboard",
  onClose,
  isMobile = false,
}: SidebarProps) {
  const generalItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "users", label: "Users", icon: Users },
    { id: "statistics", label: "Statistics & reports", icon: BarChart3 },
    { id: "education", label: "Education", icon: BookOpen },
    { id: "articles", label: "My articles", icon: FileText },
  ];

  const toolsItems = [
    { id: "chats", label: "Chats & calls", icon: MessageCircle },
    { id: "billing", label: "Billing", icon: DollarSign },
    { id: "documents", label: "Documents base", icon: FolderOpen },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "logout", label: "Log out", icon: LogOut },
  ];

  return (
    <div
      className={`
        w-64 bg-gray-800 text-white h-screen flex flex-col
        ${isMobile ? "" : "fixed lg:relative z-50"}
      `}
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-700 flex items-center justify-between">
        <h1 className="text-xl font-bold">intelly</h1>
        {isMobile && onClose && (
          <button
            onClick={onClose}
            className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* General Section */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {generalItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.label;

            return (
              <button
                key={item.id}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors
                  ${
                    isActive
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }
                `}
                onClick={() => {
                  if (isMobile && onClose) {
                    onClose();
                  }
                }}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tools Section */}
        <div className="mt-8">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Tools
          </h3>
          <div className="space-y-2">
            {toolsItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.label;

              return (
                <button
                  key={item.id}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors
                    ${
                      isActive
                        ? "bg-gray-700 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }
                  `}
                  onClick={() => {
                    if (isMobile && onClose) {
                      onClose();
                    }
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
