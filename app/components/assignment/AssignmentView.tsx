"use client";

import { Assignment } from "@/app/types/assignment";
import { Button } from "@/app/components/main/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/main/ui/card";
import { Badge } from "@/app/components/main/ui/badge";
import {
  Calendar,
  Edit,
  ArrowLeft,
  Users,
  BookOpen,
  ExternalLink,
  FileText,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface AssignmentViewProps {
  assignment?: Assignment;
  onEdit: () => void;
  onBack: () => void;
}

export function AssignmentView({
  assignment,
  onEdit,
  onBack,
}: AssignmentViewProps) {
  if (!assignment) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">과제를 찾을 수 없습니다.</p>
      </div>
    );
  }

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
      return format(new Date(dateString), "yyyy년 MM월 dd일 (E) HH:mm", {
        locale: ko,
      });
    } catch {
      return dateString;
    }
  };

  const formatCreatedDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "yyyy년 MM월 dd일 HH:mm", {
        locale: ko,
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            목록으로
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">과제 상세</h1>
            <p className="text-muted-foreground">
              과제 내용을 확인하고 관리하세요.
            </p>
          </div>
        </div>
        <Button onClick={onEdit} className="gap-2">
          <Edit className="h-4 w-4" />
          수정
        </Button>
      </div>

      {/* 과제 정보 */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-4">
                {assignment.title}
              </CardTitle>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">마감일:</span>
                  {formatDate(assignment.dueDate)}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="font-medium">반:</span>
                  {assignment.selectedClass}
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="font-medium">주제:</span>
                  {assignment.subject}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge(assignment.dueDate)}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 링크들 */}
          {(assignment.videoLink || assignment.googleDriveLink) && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                첨부 자료
              </h3>
              <div className="flex gap-4">
                {assignment.videoLink && (
                  <a
                    href={assignment.videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    영상 링크
                  </a>
                )}
                {assignment.googleDriveLink && (
                  <a
                    href={assignment.googleDriveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    구글 드라이브
                  </a>
                )}
              </div>
            </div>
          )}

          {/* 과제 내용 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5" />
              과제 내용
            </h3>
            <div
              className="prose prose-sm max-w-none p-4 bg-gray-50 rounded-lg border"
              dangerouslySetInnerHTML={{ __html: assignment.content }}
            />
          </div>

          {/* 메타 정보 */}
          <div className="pt-4 border-t">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="font-medium">생성일:</span>
                {formatCreatedDate(assignment.createdAt)}
              </div>
              {assignment.updatedAt !== assignment.createdAt && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">수정일:</span>
                  {formatCreatedDate(assignment.updatedAt)}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
