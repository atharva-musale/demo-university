import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { TeacherService } from '../../services';
import { Observable } from 'rxjs';
import { Teacher } from '../../models';
import { DisplayNamePipe } from '../../pipes';

@Component({
  selector: 'app-teachers',
  imports: [AsyncPipe, MatExpansionModule, DisplayNamePipe],
  templateUrl: './teachers.html',
  styleUrl: './teachers.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Teachers {
  /** Observable stream of teachers */
  public teachers$: Observable<Teacher[]>;

  constructor(private teacherService: TeacherService) {
    this.teachers$ = this.teacherService.teachers$;
  }
}
