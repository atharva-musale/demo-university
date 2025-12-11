import { BehaviorSubject } from "rxjs";
import { vi } from "vitest";
import { TeacherService } from "./teacher.service";
import { Teacher } from "../../models";

export class TeacherServiceFixture implements Readonly<TeacherService> {
  public teachers$ = new BehaviorSubject<Teacher[]>([]);
  public addTeacher = vi.fn();
  public generateTeacherId = vi.fn();
}
