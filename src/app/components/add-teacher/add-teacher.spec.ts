import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { AddTeacher } from './add-teacher';
import { TeacherService } from '../../services';
import { clickElementByClass, setInputElementValueByClass } from '../../testing';
import { TeacherServiceFixture } from '../../services/fixtures';

describe('AddTeacher', () => {
  let component: AddTeacher;
  let fixture: ComponentFixture<AddTeacher>;
  let mockTeacherService: TeacherServiceFixture

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
    await fixture.whenStable();
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
    expect(component.teacherForm.valid).toBe(false);
    expect(component.isFormValid()).toBe(false);
  });

  it('should have invalid form with invalid email', () => {
    component.teacherForm.patchValue({
      firstname: 'John',
      lastname: 'Doe',
      email: 'invalid-email',
      age: 30,
      experience: 5,
      subject: 'Math',
      salary: 50000
    });

    expect(component.teacherForm.valid).toBe(false);
    expect(component.teacherForm.get('email')?.hasError('email')).toBe(true);
  });

  it('should have invalid form with age below minimum', () => {
    component.teacherForm.patchValue({
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@example.com',
      age: 20,
      experience: 5,
      subject: 'Math',
      salary: 50000
    });

    expect(component.teacherForm.valid).toBe(false);
    expect(component.teacherForm.get('age')?.hasError('min')).toBe(true);
  });

  it('should have invalid form with age above maximum', () => {
    component.teacherForm.patchValue({
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@example.com',
      age: 66,
      experience: 5,
      subject: 'Math',
      salary: 50000
    });

    expect(component.teacherForm.valid).toBe(false);
    expect(component.teacherForm.get('age')?.hasError('max')).toBe(true);
  });

  it('should have valid form with all required fields', () => {
    component.teacherForm.patchValue({
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@example.com',
      age: 30,
      experience: 5,
      subject: 'Math',
      salary: 50000
    });

    expect(component.teacherForm.valid).toBe(true);
    expect(component.isFormValid()).toBe(true);
  });

  it('should call addTeacher service on submit', () => {
    vi.useFakeTimers();

    const teacherData = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@example.com',
      age: 30,
      experience: 5,
      subject: 'Math',
      salary: 50000
    };
    component.teacherForm.patchValue(teacherData);
    clickElementByClass(fixture, 'submit-button');

    vi.runAllTimers();
    fixture.detectChanges();

    expect(mockTeacherService.addTeacher).toHaveBeenCalledWith(teacherData);

    vi.useRealTimers();
  });
});
