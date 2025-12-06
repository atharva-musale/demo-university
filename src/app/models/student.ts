import { FullName } from "./name";

export interface Student extends FullName {
  id: string;
  firstname: string;
  lastname: string;
  age: number;
  dateOfBirth: string;
  gender: string;
  yearOfStudy: number;
  branch: string;
  subjects: string[];
}

export type StudentFormData = Omit<Student, 'id'>;
