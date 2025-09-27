"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/main/ui/card";
import { Heart, Star } from "lucide-react";

interface DashboardCardProps {
  title: string;
  summary: string;
  color: "yellow" | "pink" | "green" | "blue";
  icon?: React.ReactNode;
  showAllLink?: boolean;
  children?: React.ReactNode;
}

export function DashboardCard({
  title,
  summary,
  color,
  icon,
  showAllLink,
  children,
}: DashboardCardProps) {
  const colorClasses = {
    yellow: "bg-yellow-50 border-yellow-200",
    pink: "bg-pink-50 border-pink-200",
    green: "bg-green-50 border-green-200",
    blue: "bg-blue-50 border-blue-200",
  };

  return (
    <Card className={`${colorClasses[color]} border-2`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800">
            {title}
          </CardTitle>
          {icon && <div className="text-gray-400">{icon}</div>}
        </div>
        <p className="text-sm text-gray-600 mt-1">{summary}</p>
        {showAllLink && (
          <div className="text-right">
            <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
              Show all
            </button>
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-0">{children}</CardContent>
    </Card>
  );
}

export function UsersCard() {
  return (
    <DashboardCard
      title="Users"
      summary="14 pers (07:30 pm), 5 pers (10:40 am), 2 pers (12:00 pm)"
      color="yellow"
    >
      <div className="h-16 sm:h-20 flex items-end space-x-1 sm:space-x-2">
        <div className="flex-1 bg-yellow-300 rounded-t h-12 sm:h-16"></div>
        <div className="flex-1 bg-yellow-200 rounded-t h-6 sm:h-8"></div>
        <div className="flex-1 bg-yellow-300 rounded-t h-12 sm:h-16"></div>
        <div className="flex-1 bg-yellow-200 rounded-t h-3 sm:h-4"></div>
        <div className="flex-1 bg-yellow-300 rounded-t h-9 sm:h-12"></div>
      </div>
    </DashboardCard>
  );
}

// Visits Summary Card with Chart
export function VisitsSummaryCard() {
  return (
    <DashboardCard
      title="Visits summary"
      summary="24 min (AVERAGE), 15 min (MINIMUM), 01:30 h (MAXIMUM)"
      color="pink"
      icon={<Heart className="w-4 h-4 sm:w-5 sm:h-5" />}
      showAllLink
    >
      <div className="h-16 sm:h-20 relative">
        <svg className="w-full h-full" viewBox="0 0 200 80">
          <polyline
            points="10,60 30,45 50,35 70,25 90,20 110,25 130,30 150,35 170,40 190,45"
            fill="none"
            stroke="#ec4899"
            strokeWidth="2"
          />
          <circle cx="90" cy="20" r="3" fill="#ec4899" />
        </svg>
      </div>
    </DashboardCard>
  );
}

// By Condition Card
export function ByConditionCard() {
  return (
    <DashboardCard
      title="By condition"
      summary="14 pers (STABLE), 5 pers (FAIR), 1 pers (CRITICAL)"
      color="green"
    >
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">STABLE</span>
          <span className="text-sm font-medium">14</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: "70%" }}
          ></div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">FAIR</span>
          <span className="text-sm font-medium">5</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-yellow-500 h-2 rounded-full"
            style={{ width: "25%" }}
          ></div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">CRITICAL</span>
          <span className="text-sm font-medium">1</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-red-500 h-2 rounded-full"
            style={{ width: "5%" }}
          ></div>
        </div>
      </div>
    </DashboardCard>
  );
}

// Sessions Card
export function SessionsCard() {
  return (
    <DashboardCard
      title="Sessions"
      summary="03:45 h (IN CLINIC), 02:00 min (VIDEO CALL), 00:24 min (IN CHAT)"
      color="blue"
      icon={<Star className="w-4 h-4 sm:w-5 sm:h-5" />}
    >
      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full"></div>
            <span className="text-xs sm:text-sm text-gray-600">IN CLINIC</span>
          </div>
          <span className="text-xs sm:text-sm font-medium">03:45 h</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs sm:text-sm text-gray-600">VIDEO CALL</span>
          </div>
          <span className="text-xs sm:text-sm font-medium">02:00 min</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full"></div>
            <span className="text-xs sm:text-sm text-gray-600">IN CHAT</span>
          </div>
          <span className="text-xs sm:text-sm font-medium">00:24 min</span>
        </div>
      </div>
    </DashboardCard>
  );
}
