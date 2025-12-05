import { Address } from "./address";

export interface Teacher {
  id: string;
  firstname: string;
  lastname: string;
  age: number;
  experience: number;
  subject: string;
  salary: number;
  address: Address;
}

export type TeacherFormData = Omit<Teacher, 'id'>;
