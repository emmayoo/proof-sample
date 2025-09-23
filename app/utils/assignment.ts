// 과제 관련 localStorage 유틸리티 함수들
import { Assignment } from "@/app/types/assignment";

const ASSIGNMENTS_STORAGE_KEY = "assignments";

export const getAssignments = (): Assignment[] => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(ASSIGNMENTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading assignments from localStorage:", error);
    return [];
  }
};

export const saveAssignments = (assignments: Assignment[]): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(ASSIGNMENTS_STORAGE_KEY, JSON.stringify(assignments));
  } catch (error) {
    console.error("Error saving assignments to localStorage:", error);
  }
};

export const addAssignment = (
  assignment: Omit<Assignment, "id" | "createdAt" | "updatedAt">
): Assignment => {
  const assignments = getAssignments();
  const newAssignment: Assignment = {
    ...assignment,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const updatedAssignments = [...assignments, newAssignment];
  saveAssignments(updatedAssignments);
  return newAssignment;
};

export const updateAssignment = (
  id: string,
  updates: Partial<Assignment>
): Assignment | null => {
  const assignments = getAssignments();
  const index = assignments.findIndex((assignment) => assignment.id === id);

  if (index === -1) return null;

  const updatedAssignment: Assignment = {
    ...assignments[index],
    ...updates,
    id, // ID는 변경하지 않음
    updatedAt: new Date().toISOString(),
  };

  const updatedAssignments = [...assignments];
  updatedAssignments[index] = updatedAssignment;
  saveAssignments(updatedAssignments);
  return updatedAssignment;
};

export const deleteAssignment = (id: string): boolean => {
  const assignments = getAssignments();
  const filteredAssignments = assignments.filter(
    (assignment) => assignment.id !== id
  );

  if (filteredAssignments.length === assignments.length) return false;

  saveAssignments(filteredAssignments);
  return true;
};

export const getAssignmentById = (id: string): Assignment | null => {
  const assignments = getAssignments();
  return assignments.find((assignment) => assignment.id === id) || null;
};
