import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StudentService } from '../../services';
import { Observable } from 'rxjs';
import { Student } from '../../models';
import { MatExpansionModule } from '@angular/material/expansion';
import { DisplayNamePipe } from '../../pipes';

@Component({
  selector: 'app-students',
  imports: [AsyncPipe, DisplayNamePipe, MatExpansionModule],
  templateUrl: './students.html',
  styleUrl: './students.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Students {
  /** Observable stream of students */
  public students$: Observable<Student[]>;

  constructor(private studentService: StudentService) {
    this.students$ = this.studentService.students$;
  }
}
