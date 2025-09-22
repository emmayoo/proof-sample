"use client";

import { useState } from "react";
import {
  Header,
  ByConditionCard,
  UsersCard,
  PatientList,
  RightSidebar,
  SessionsCard,
  Sidebar,
  VisitDetails,
  VisitsSummaryCard,
} from "@/app/components";

export default function Page() {
  const [selectedPatientId, setSelectedPatientId] = useState<string>("1");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // 샘플 환자 데이터
  const patients = [
    {
      id: "1",
      name: "Taigo Wilkinson",
      description: "Emergency Visit",
      time: "09:15 AM",
      type: "emergency" as const,
    },
    {
      id: "2",
      name: "Samantha Williams",
      description: "Routine Check-up",
      time: "09:15 AM",
      type: "routine" as const,
    },
    {
      id: "3",
      name: "Amy White",
      description: "Video Consultation",
      time: "09:15 AM",
      type: "video" as const,
    },
    {
      id: "4",
      name: "Tyler Young",
      description: "Report",
      time: "09:45 AM",
      type: "report" as const,
    },
  ];

  // 선택된 환자의 상세 정보
  const selectedPatient =
    selectedPatientId === "1"
      ? {
          name: "Taigo Wilkinson",
          gender: "Male",
          age: "38 Years 5 Months",
          id: "REG4-TES-M472",
          conditions: ["Fever", "Cough", "Heart Burn"],
          lastChecked: "Last checked: 2 days ago",
          observation: "High fever and cough at normal hemoglobin levels",
          prescriptions: [
            "Paracetamol - 3 times a day",
            "Dospan - Day and Night before meal",
          ],
        }
      : null;

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Mobile Header - Only visible on small screens */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <button
            className="p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-900">intelly</h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`
        lg:hidden fixed top-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <Sidebar
          activeItem="Dashboard"
          onClose={() => setIsMobileMenuOpen(false)}
          isMobile={true}
        />
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Left Sidebar - Hidden on mobile, visible on tablet+ */}
        <div className="hidden lg:block">
          <Sidebar activeItem="Dashboard" />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0">
          {/* Header - Hidden on mobile, visible on tablet+ */}
          <div className="hidden lg:block">
            <Header />
          </div>

          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="lg:hidden p-4 space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Hi, Emma yoo
                </h1>
                <p className="text-gray-600 text-sm">How are you, today?</p>
              </div>

              <div className="space-y-4">
                <UsersCard />
                <VisitsSummaryCard />
                <ByConditionCard />
                <SessionsCard />
              </div>

              <div className="space-y-4">
                <PatientList
                  patients={patients}
                  selectedPatientId={selectedPatientId}
                  onPatientSelect={setSelectedPatientId}
                />
                <VisitDetails patient={selectedPatient} />
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Today's Schedule
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>07:00</span>
                      <span>Emergency visit</span>
                    </div>
                    <div className="flex justify-between">
                      <span>07:30</span>
                      <span>Diagnostic test</span>
                    </div>
                    <div className="flex justify-between">
                      <span>08:00-09:00</span>
                      <span>Team daily planning</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tablet+ Layout */}
            <div className="hidden lg:flex h-full min-h-0 overflow-y-auto">
              {/* Center Content */}
              <div className="flex-1 p-6 space-y-6 min-w-0 min-h-0">
                {/* Welcome Message */}
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Hi, Emma yoo
                  </h1>
                  <p className="text-gray-600">How are you, today?</p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <UsersCard />
                  <VisitsSummaryCard />
                  <ByConditionCard />
                  <SessionsCard />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <PatientList
                    patients={patients}
                    selectedPatientId={selectedPatientId}
                    onPatientSelect={setSelectedPatientId}
                  />
                  <VisitDetails patient={selectedPatient} />
                </div>
              </div>

              <div className="hidden xl:block p-6 h-full min-h-0">
                <RightSidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
