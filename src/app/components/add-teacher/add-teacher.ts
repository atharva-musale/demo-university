import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-teacher',
  imports: [MatFormField, MatLabel, ReactiveFormsModule, MatInputModule],
  templateUrl: './add-teacher.html',
  styleUrls: ['./add-teacher.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTeacher {
  /**
   * Reactive form group for adding a new teacher
   */
  public teacherForm: UntypedFormGroup;

  constructor(private formBuilder: FormBuilder) {
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

  public onSubmit() {
    console.log('Teacher Form Submitted', this.teacherForm.value);
  }
}
