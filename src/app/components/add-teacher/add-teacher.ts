import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormValidityChecker } from '../../models/form-validity';
import { TeacherService } from '../../services';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-add-teacher',
  imports: [MatFormField, MatLabel, ReactiveFormsModule, MatInputModule],
  templateUrl: './add-teacher.html',
  styleUrls: ['./add-teacher.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTeacher implements FormValidityChecker {
  /**
   * Reactive form group for adding a new teacher
   */
  public teacherForm: UntypedFormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private teacherService: TeacherService
  ) {
    this.teacherForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: [null, [Validators.required, Validators.min(21), Validators.max(65)]],
      experience: [null, [Validators.required]],
      subject: ['', Validators.required],
      salary: [null, [Validators.required]]
    });
  }

  /**
   * Handles the form submission to add a new teacher.
   */
  public async onSubmit() {
    if (this.teacherForm.valid) {
      await firstValueFrom(this.teacherService.addTeacher(this.teacherForm.value));
    }
  }

  /**
   * Checks if the teacher form is valid.
   * needed for the guard
   *
   * @returns boolean
   */
  public isFormValid(): boolean {
    return this.teacherForm.valid;
  }
}
