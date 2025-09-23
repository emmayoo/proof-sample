"use client";

import { useState } from "react";
import { Assignment } from "@/app/types/assignment";
import { AssignmentList } from "@/app/components/assignment/AssignmentList";
import { AssignmentForm } from "@/app/components/assignment/AssignmentForm";
import { AssignmentView } from "@/app/components/assignment/AssignmentView";
import { Button } from "@/app/components/main/ui/button";
import { Plus } from "lucide-react";

type ViewMode = "list" | "create" | "edit" | "view";

export default function AssignmentPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [editingAssignment, setEditingAssignment] = useState<
    Assignment | undefined
  >();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateNew = () => {
    setEditingAssignment(undefined);
    setViewMode("create");
  };

  const handleEdit = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setViewMode("edit");
  };

  const handleView = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setViewMode("view");
  };

  const handleSave = () => {
    setViewMode("list");
    setEditingAssignment(undefined);
    setRefreshKey((prev) => prev + 1);
  };

  const handleCancel = () => {
    setViewMode("list");
    setEditingAssignment(undefined);
  };

  const renderContent = () => {
    switch (viewMode) {
      case "create":
        return <AssignmentForm onSave={handleSave} onCancel={handleCancel} />;

      case "edit":
        return (
          <AssignmentForm
            assignment={editingAssignment}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        );

      case "view":
        return (
          <AssignmentView
            assignment={editingAssignment}
            onEdit={() => setViewMode("edit")}
            onBack={handleCancel}
          />
        );

      case "list":
      default:
        return (
          <div className="space-y-6">
            {/* 헤더 */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">과제 관리</h1>
                <p className="text-muted-foreground">
                  학생들에게 배포할 과제를 생성하고 관리하세요.
                </p>
              </div>
              <Button onClick={handleCreateNew} className="gap-2">
                <Plus className="h-4 w-4" />새 과제 생성
              </Button>
            </div>

            {/* 과제 목록 */}
            <AssignmentList
              key={refreshKey}
              onEdit={handleEdit}
              onView={handleView}
              onRefresh={() => setRefreshKey((prev) => prev + 1)}
            />
          </div>
        );
    }
  };

  return <div className="container mx-auto py-6 px-4">{renderContent()}</div>;
}
