import { BehaviorSubject } from "rxjs";
import { vi } from "vitest";
import { StudentService } from "./student.service";
import { Student } from "../../models";

export class StudentServiceFixture implements Readonly<StudentService> {
  public students$ = new BehaviorSubject<Student[]>([]);
  public addStudent = vi.fn();
  public generateStudentId = vi.fn();
}
