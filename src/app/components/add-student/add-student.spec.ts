import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of } from 'rxjs';

import { AddStudent } from './add-student';
import { StudentService } from '../../services';
import { clickElementBySelector } from '../../testing';
import { StudentServiceFixture } from '../../services/fixtures';

describe('AddStudent', () => {
  let component: AddStudent;
  let fixture: ComponentFixture<AddStudent>;
  let mockStudentService: StudentServiceFixture;

  const mockStudent = {
    firstname: 'Jane',
    lastname: 'Smith',
    age: 20,
    dateOfBirth: new Date('2005-01-01'),
    gender: 'Female',
    yearOfStudy: 2,
    branch: 'Computer Science',
    subjects: ['Math', 'Physics']
  };

  beforeEach(async () => {
    mockStudentService = new StudentServiceFixture();

    await TestBed.configureTestingModule({
      imports: [AddStudent],
      providers: [
        { provide: StudentService, useValue: mockStudentService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.studentForm.value).toEqual({
      firstname: '',
      lastname: '',
      age: null,
      dateOfBirth: '',
      gender: '',
      yearOfStudy: null,
      branch: '',
      subjects: []
    });
  });

  it('should have invalid form when empty', () => {
    expect(component.isFormValid()).toBe(false);
  });

  it('should have invalid form with age below minimum', () => {
    component.studentForm.patchValue({ ...mockStudent, age: 15 });

    expect(component.studentForm.valid).toBe(false);
    expect(component.studentForm.get('age')?.hasError('min')).toBe(true);
  });

  it('should have invalid form with age above maximum', () => {
    component.studentForm.patchValue({ ...mockStudent, age: 31 });

    expect(component.studentForm.valid).toBe(false);
    expect(component.studentForm.get('age')?.hasError('max')).toBe(true);
  });

  it('should have invalid form with yearOfStudy below minimum', () => {
    component.studentForm.patchValue({ ...mockStudent, yearOfStudy: 0 });

    expect(component.studentForm.valid).toBe(false);
    expect(component.studentForm.get('yearOfStudy')?.hasError('min')).toBe(true);
  });

  it('should have invalid form with yearOfStudy above maximum', () => {
    component.studentForm.patchValue({ ...mockStudent, yearOfStudy: 5 });

    expect(component.studentForm.valid).toBe(false);
    expect(component.studentForm.get('yearOfStudy')?.hasError('max')).toBe(true);
  });

  /**
   * Why is this test failing?
   */
  it('should have valid form with all required fields', () => {
    component.studentForm.patchValue(mockStudent);

    expect(component.isFormValid()).toBe(true);
  });

  it('should call onSubmit function when submit button is clicked', () => {
    mockStudentService.addStudent = vi.fn().mockReturnValue(of(mockStudent));
    component.studentForm.patchValue(mockStudent);
    clickElementBySelector(fixture, '.submit-button');

    expect(mockStudentService.addStudent).toHaveBeenCalledWith(mockStudent);
  });
});
