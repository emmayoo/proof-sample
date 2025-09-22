"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/main/ui/card";
import { Badge } from "@/app/components/main/ui/badge";
import { Button } from "@/app/components/main/ui/button";
import { ExternalLink } from "lucide-react";

interface VisitDetailsProps {
  patient: {
    name: string;
    gender: string;
    age: string;
    id: string;
    conditions: string[];
    lastChecked: string;
    observation: string;
    prescriptions: string[];
  } | null;
}

export function VisitDetails({ patient }: VisitDetailsProps) {
  if (!patient) {
    return (
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Visit details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            환자를 선택하여 상세 정보를 확인하세요.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Visit details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Patient Info */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
            {patient.name}, {patient.gender} - {patient.age}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600">{patient.id}</p>
        </div>

        {/* Conditions */}
        <div>
          <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">
            Conditions
          </h4>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {patient.conditions.map((condition, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {condition}
              </Badge>
            ))}
          </div>
        </div>

        {/* Last Checked */}
        <div>
          <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Last checked
          </h4>
          <p className="text-xs sm:text-sm text-gray-600">
            {patient.lastChecked}
          </p>
          <Button
            variant="link"
            size="sm"
            className="p-0 h-auto text-blue-600 text-xs sm:text-sm"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            Prescription
          </Button>
        </div>

        {/* Observation */}
        <div>
          <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">
            Observation
          </h4>
          <p className="text-xs sm:text-sm text-gray-600 bg-gray-50 p-2 sm:p-3 rounded-lg">
            {patient.observation}
          </p>
        </div>

        {/* Prescriptions */}
        <div>
          <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">
            Prescription
          </h4>
          <div className="space-y-1 sm:space-y-2">
            {patient.prescriptions.map((prescription, index) => (
              <div
                key={index}
                className="text-xs sm:text-sm text-gray-600 bg-gray-50 p-2 sm:p-3 rounded-lg"
              >
                {prescription}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
