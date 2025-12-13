import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';

import { Admin } from './admin';
import { clickElementBySelector, getElementBySelector } from '../../testing';

describe('Admin', () => {
  let component: Admin;
  let fixture: ComponentFixture<Admin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Admin]
    }).compileComponents();

    fixture = TestBed.createComponent(Admin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with students view by default', () => {
    const studentElement = getElementBySelector(fixture, 'app-students');

    expect(studentElement).toBeTruthy();
  });

  it('should toggle to teachers view when toggleView is called with teachers', () => {
    clickElementBySelector(fixture, '.show-teachers-button');
    fixture.detectChanges();

    const studentElement = getElementBySelector(fixture, 'app-students');
    const teacherElement = getElementBySelector(fixture, 'app-teachers');

    expect(studentElement).toBeFalsy();
    expect(teacherElement).toBeTruthy();
  });
});
