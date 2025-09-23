// 과제 관련 타입 정의
export interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  selectedClass: string;
  subject: string;
  content: string;
  videoLink?: string;
  googleDriveLink?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AssignmentFormData {
  title: string;
  dueDate: string;
  selectedClass: string;
  subject: string;
  content: string;
  videoLink?: string;
  googleDriveLink?: string;
}
