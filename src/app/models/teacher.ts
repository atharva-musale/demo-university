import { Address } from "./address";
import { FullName } from "./name";

export interface Teacher extends FullName {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  age: number;
  experience: number;
  subject: string;
  salary: number;
  address: Address;
}

export type TeacherFormData = Omit<Teacher, 'id'>;
