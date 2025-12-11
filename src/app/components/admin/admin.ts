import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Students } from '../students/students';
import { Teachers } from '../teachers/teachers';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [Students, Teachers, AsyncPipe],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Admin {
  /**
   * Subject to toggle between displaying students or teachers view.
   */
  private showStudentsOrTeachersSubject$ = new BehaviorSubject<'students' | 'teachers'>('students');

  /**
   * Observable that emits the current view to display: students or teachers.
   */
  public showStudentsOrTeachers$ = this.showStudentsOrTeachersSubject$.asObservable();

  /**
   * Toggles the view between students and teachers.
   *
   * @param view whether to show 'students' or 'teachers'
   */
  public toggleView(view: 'students' | 'teachers') {
    this.showStudentsOrTeachersSubject$.next(view);
  }
}
