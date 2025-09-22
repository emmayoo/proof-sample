"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/main/ui/card";
import { Button } from "@/app/components/main/ui/button";
import { ChevronDown, Clock } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  description: string;
  time: string;
  type: "emergency" | "routine" | "video" | "report";
}

interface PatientListProps {
  patients: Patient[];
  selectedPatientId?: string;
  onPatientSelect: (patientId: string) => void;
}

export function PatientList({
  patients,
  selectedPatientId,
  onPatientSelect,
}: PatientListProps) {
  const getTypeIcon = (type: Patient["type"]) => {
    switch (type) {
      case "emergency":
        return "🚨";
      case "routine":
        return "🏥";
      case "video":
        return "📹";
      case "report":
        return "📋";
      default:
        return "👤";
    }
  };

  const getTypeColor = (type: Patient["type"]) => {
    switch (type) {
      case "emergency":
        return "text-red-600";
      case "routine":
        return "text-blue-600";
      case "video":
        return "text-green-600";
      case "report":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card className="bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Patient&apos;s list
          </CardTitle>
          <Button variant="outline" size="sm" className="text-gray-600">
            Today
            <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {patients.map((patient) => (
            <div
              key={patient.id}
              onClick={() => onPatientSelect(patient.id)}
              className={`
                p-3 rounded-lg border cursor-pointer transition-colors
                ${
                  selectedPatientId === patient.id
                    ? "bg-blue-50 border-blue-200"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <div className="text-base sm:text-lg">
                  {getTypeIcon(patient.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                    <h4 className="font-medium text-gray-900 text-sm sm:text-base truncate">
                      {patient.name}
                    </h4>
                    <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{patient.time}</span>
                    </div>
                  </div>
                  <p
                    className={`text-xs sm:text-sm mt-1 ${getTypeColor(
                      patient.type
                    )}`}
                  >
                    {patient.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
