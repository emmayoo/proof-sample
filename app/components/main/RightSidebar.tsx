"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/main/ui/card";
import { Button } from "@/app/components/main/ui/button";
import { Calendar } from "@/app/components/main/ui/calendar";
import { Avatar, AvatarFallback } from "@/app/components/main/ui/avatar";
import { Plus } from "lucide-react";

interface TimelineEvent {
  time: string;
  title: string;
  location: string;
  type: "emergency" | "diagnostic" | "meeting";
  participants?: string[];
}

const timelineEvents: TimelineEvent[] = [
  {
    time: "07:00",
    title: "Emergency visit",
    location: "West camp, Room 101",
    type: "emergency",
  },
  {
    time: "07:30",
    title: "Diagnostic test",
    location: "East camp, Laboratory Room 8",
    type: "diagnostic",
  },
  {
    time: "08:00-09:00",
    title: "Team daily planning",
    location: "East camp, Room 200",
    type: "meeting",
    participants: ["A", "B", "C", "D"],
  },
  {
    time: "09:00",
    title: "Emergency visit",
    location: "West camp, Room 101",
    type: "emergency",
  },
];

export function RightSidebar() {
  const getEventIcon = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "emergency":
        return "🚨";
      case "diagnostic":
        return "🔬";
      case "meeting":
        return "👥";
      default:
        return "📅";
    }
  };

  const getEventColor = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "emergency":
        return "text-red-600";
      case "diagnostic":
        return "text-blue-600";
      case "meeting":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="w-80 space-y-6">
      {/* Calendar */}
      <Card className="bg-white">
        <CardContent>
          <Calendar
            mode="single"
            selected={new Date()}
            className="rounded-md border-0"
            classNames={{
              day_selected: "bg-blue-600 text-white hover:bg-blue-600",
              day_today: "bg-gray-100 text-gray-900",
            }}
          />
          <Button className="w-full mt-4" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add event
          </Button>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="bg-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Today&apos;s timeline
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {timelineEvents.map((event, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
                    {getEventIcon(event.type)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {event.time}
                    </p>
                  </div>
                  <p
                    className={`text-sm font-medium ${getEventColor(
                      event.type
                    )}`}
                  >
                    {event.title}
                  </p>
                  <p className="text-xs text-gray-500">{event.location}</p>
                  {event.participants && (
                    <div className="flex items-center space-x-1 mt-2">
                      {event.participants.map((participant, pIndex) => (
                        <Avatar key={pIndex} className="w-5 h-5">
                          <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                            {participant}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4" size="sm">
            View all details
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
