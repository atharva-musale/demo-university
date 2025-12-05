import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatePlaceholderMaskDirective } from '../../directives/date-placeholder-mask.directive';
import { MatDatepicker, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-add-student',
  imports: [MatFormField, MatLabel, ReactiveFormsModule, MatInputModule, DatePlaceholderMaskDirective, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-student.html',
  styleUrl: './add-student.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddStudent {
  /**
   * Reactive form group for adding a new student
   */
  public studentForm: UntypedFormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.studentForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(16), Validators.max(30)]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      yearOfStudy: [null, [Validators.required, Validators.min(1), Validators.max(4)]],
      branch: ['', Validators.required],
      subjects: [[], Validators.required]
    });
  }

  public onSubmit() {
    console.log('Student Form Submitted', this.studentForm.value);
  }
}
