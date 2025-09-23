"use client";

import { useState, useEffect } from "react";
import { Assignment } from "@/app/types/assignment";
import { getAssignments, deleteAssignment } from "@/app/utils/assignment";
import { Button } from "@/app/components/main/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/main/ui/card";
import { Badge } from "@/app/components/main/ui/badge";
import { Calendar, Edit, Trash2, ExternalLink, FileText } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface AssignmentListProps {
  onEdit: (assignment: Assignment) => void;
  onView: (assignment: Assignment) => void;
  onRefresh: () => void;
}

export function AssignmentList({
  onEdit,
  onView,
  onRefresh,
}: AssignmentListProps) {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = () => {
    try {
      const data = getAssignments();
      // 마감일 기준으로 정렬 (가까운 날짜가 먼저)
      const sortedData = data.sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
      setAssignments(sortedData);
    } catch (error) {
      console.error("과제 목록을 불러오는 중 오류가 발생했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("정말로 이 과제를 삭제하시겠습니까?")) {
      try {
        const success = deleteAssignment(id);
        if (success) {
          loadAssignments();
          onRefresh();
        }
      } catch (error) {
        console.error("과제 삭제 중 오류가 발생했습니다:", error);
        alert("과제 삭제에 실패했습니다.");
      }
    }
  };

  const getStatusBadge = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffDays = Math.ceil(
      (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0) {
      return <Badge variant="destructive">마감됨</Badge>;
    } else if (diffDays === 0) {
      return <Badge variant="destructive">오늘 마감</Badge>;
    } else if (diffDays <= 3) {
      return <Badge variant="secondary">마감 임박</Badge>;
    } else {
      return <Badge variant="outline">진행중</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "yyyy년 MM월 dd일 (E)", {
        locale: ko,
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">과제 목록을 불러오는 중...</div>
      </div>
    );
  }

  if (assignments.length === 0) {
    return (
      <div className="text-center p-8">
        <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">등록된 과제가 없습니다</h3>
        <p className="text-muted-foreground">새로운 과제를 생성해보세요.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {assignments.map((assignment) => (
        <Card
          key={assignment.id}
          className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onView(assignment)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg mb-2">
                  {assignment.title}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(assignment.dueDate)}
                  </div>
                  <div>{assignment.selectedClass}</div>
                  <div>{assignment.subject}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(assignment.dueDate)}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(assignment);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(assignment.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {/* 과제 내용 미리보기 */}
              <div className="text-sm text-muted-foreground line-clamp-2">
                {assignment.content.replace(/<[^>]*>/g, "").substring(0, 100)}
                {assignment.content.length > 100 && "..."}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
