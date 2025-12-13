import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';

import { AddTeacher } from './add-teacher';
import { TeacherService } from '../../services';
import { clickElementBySelector } from '../../testing';
import { TeacherServiceFixture } from '../../services/fixtures';
import { of } from 'rxjs';

describe('AddTeacher', () => {
  let component: AddTeacher;
  let fixture: ComponentFixture<AddTeacher>;
  let mockTeacherService: TeacherServiceFixture

  const mockTeacher = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john@example.com',
    age: 30,
    experience: 5,
    subject: 'Math',
    salary: 50000
  };

  beforeEach(async () => {
   mockTeacherService = new TeacherServiceFixture();

    await TestBed.configureTestingModule({
      imports: [AddTeacher],
      providers: [
        { provide: TeacherService, useValue: mockTeacherService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTeacher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.teacherForm.value).toEqual({
      firstname: '',
      lastname: '',
      email: '',
      age: null,
      experience: null,
      subject: '',
      salary: null
    });
  });

  it('should have invalid form when empty', () => {
    expect(component.isFormValid()).toBe(false);
  });

  it('should have invalid form with invalid email', () => {
    component.teacherForm.patchValue({ ...mockTeacher, email: 'invalid-email' });

    expect(component.teacherForm.valid).toBe(false);
    expect(component.teacherForm.get('email')?.hasError('email')).toBe(true);
  });

  it('should have invalid form with age below minimum', () => {
    component.teacherForm.patchValue({ ...mockTeacher, age: 20 });

    expect(component.teacherForm.valid).toBe(false);
    expect(component.teacherForm.get('age')?.hasError('min')).toBe(true);
  });

  it('should have invalid form with age above maximum', () => {
    component.teacherForm.patchValue({ ...mockTeacher, age: 66 });

    expect(component.teacherForm.valid).toBe(false);
    expect(component.teacherForm.get('age')?.hasError('max')).toBe(true);
  });

  it('should have valid form with all required fields', () => {
    component.teacherForm.patchValue(mockTeacher);

    expect(component.teacherForm.valid).toBe(true);
    expect(component.isFormValid()).toBe(true);
  });

  it('should call onSubmit function when submit button is clicked', () => {
    mockTeacherService.addTeacher = vi.fn().mockReturnValue(of(mockTeacher));
    component.teacherForm.patchValue(mockTeacher);
    clickElementBySelector(fixture, '.submit-button');

    expect(mockTeacherService.addTeacher).toHaveBeenCalledWith(mockTeacher);
  });
});
