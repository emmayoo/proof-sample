import { Bell, MoreHorizontal } from "lucide-react";
import { Button } from "@/app/components/main/ui/button";

export function Header() {
  return (
    <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0">
        <div></div>
        <div className="flex items-center space-x-2 lg:space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-gray-900 w-8 h-8 lg:w-10 lg:h-10"
          >
            <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-gray-900 w-8 h-8 lg:w-10 lg:h-10"
          >
            <MoreHorizontal className="w-4 h-4 lg:w-5 lg:h-5" />
          </Button>
          <div className="w-7 h-7 lg:w-8 lg:h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs lg:text-sm font-medium">
            O
          </div>
        </div>
      </div>
    </div>
  );
}
