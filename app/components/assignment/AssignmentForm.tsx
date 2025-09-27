"use client";

import { useState, useEffect } from "react";
import { Assignment, AssignmentFormData } from "@/app/types/assignment";
import { addAssignment, updateAssignment } from "@/app/utils/assignment";
import { Button } from "@/app/components/main/ui/button";
import { Input } from "@/app/components/main/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/main/ui/card";
import { TipTapEditor } from "@/app/components/editor/TipTapEditor";
import {
  Save,
  X,
  Calendar,
  BookOpen,
  Users,
  Link,
  FileText,
} from "lucide-react";
import { format } from "date-fns";

interface AssignmentFormProps {
  assignment?: Assignment;
  onSave: () => void;
  onCancel: () => void;
}

export function AssignmentForm({
  assignment,
  onSave,
  onCancel,
}: AssignmentFormProps) {
  const [formData, setFormData] = useState<AssignmentFormData>({
    title: "",
    dueDate: "",
    selectedClass: "",
    subject: "",
    content: "",
    videoLink: "",
    googleDriveLink: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (assignment) {
      setFormData({
        title: assignment.title,
        dueDate: assignment.dueDate,
        selectedClass: assignment.selectedClass,
        subject: assignment.subject,
        content: assignment.content,
        videoLink: assignment.videoLink || "",
        googleDriveLink: assignment.googleDriveLink || "",
      });
    }
  }, [assignment]);

  const handleInputChange = (
    field: keyof AssignmentFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("과제 제목을 입력해주세요.");
      return;
    }

    if (!formData.dueDate) {
      alert("마감일을 선택해주세요.");
      return;
    }

    if (!formData.selectedClass.trim()) {
      alert("반을 선택해주세요.");
      return;
    }

    if (!formData.subject.trim()) {
      alert("주제를 입력해주세요.");
      return;
    }

    if (!formData.content.trim()) {
      alert("과제 내용을 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      const assignmentData = {
        ...formData,
      };

      if (assignment) {
        // 수정
        const updated = updateAssignment(assignment.id, assignmentData);
        if (updated) {
          alert("과제가 성공적으로 수정되었습니다.");
          onSave();
        } else {
          alert("과제 수정에 실패했습니다.");
        }
      } else {
        // 생성
        const newAssignment = addAssignment(assignmentData);
        if (newAssignment) {
          alert("과제가 성공적으로 생성되었습니다.");
          onSave();
        } else {
          alert("과제 생성에 실패했습니다.");
        }
      }
    } catch (error) {
      console.error("과제 저장 중 오류:", error);
      alert("과제 저장 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const today = format(new Date(), "yyyy-MM-dd");

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {assignment ? "과제 수정" : "새 과제 생성"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 기본 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                과제 제목 *
              </label>
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="과제 제목을 입력하세요"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                마감일 *
              </label>
              <Input
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange("dueDate", e.target.value)}
                min={today}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />반 선택 *
              </label>
              <Input
                value={formData.selectedClass}
                onChange={(e) =>
                  handleInputChange("selectedClass", e.target.value)
                }
                placeholder="예: 1학년 1반"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                주제 *
              </label>
              <Input
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                placeholder="예: 수학, 국어, 영어"
                required
              />
            </div>
          </div>

          {/* TipTap 에디터 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">과제 내용 *</label>
            <TipTapEditor
              content={formData.content}
              onChange={handleContentChange}
              placeholder="과제 내용을 입력하세요..."
            />
          </div>

          {/* 버튼 */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
            >
              <X className="h-4 w-4 mr-2" />
              취소
            </Button>
            <Button type="submit" disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? "저장 중..." : assignment ? "수정" : "생성"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
