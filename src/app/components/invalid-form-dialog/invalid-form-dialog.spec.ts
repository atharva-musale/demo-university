import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { InvalidFormDialog } from './invalid-form-dialog';
import { clickElementBySelector, getTextContentFromElementBySelector } from '../../testing';

describe('InvalidFormDialog', () => {
  let component: InvalidFormDialog;
  let fixture: ComponentFixture<InvalidFormDialog>;
  let mockDialogRef: { close: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    mockDialogRef = {
      close: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [InvalidFormDialog],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InvalidFormDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the dialog title', () => {
    const titleText = getTextContentFromElementBySelector(fixture, '.dialog-title');
    expect(titleText?.trim()).toBe('Form Not Submitted');
  });

  it('should display the warning message', () => {
    const messageText = getTextContentFromElementBySelector(fixture, '.dialog-text');
    expect(messageText).toContain('Your form contains invalid or incomplete data');
    expect(messageText).toContain('Are you sure you want to exit without submitting?');
  });

  it('should have Stay and Fix button', () => {
    const stayButtonText = getTextContentFromElementBySelector(fixture, '.stay');
    expect(stayButtonText?.trim()).toBe('Stay and Fix');
  });

  it('should have Exit Anyway button', () => {
    const exitButtonText = getTextContentFromElementBySelector(fixture, '.exit');
    expect(exitButtonText?.trim()).toBe('Exit Anyway');
  });

  it('should close dialog with false when onStay is called', () => {
    component.onStay();
    expect(mockDialogRef.close).toHaveBeenCalledWith(false);
  });

  it('should close dialog with true when onExit is called', () => {
    component.onExit();
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should call onStay when Stay and Fix button is clicked', () => {
    const onStaySpy = vi.spyOn(component, 'onStay');

    clickElementBySelector(fixture, '.stay');

    expect(onStaySpy).toHaveBeenCalled();
    expect(mockDialogRef.close).toHaveBeenCalledWith(false);
  });

  it('should call onExit when Exit Anyway button is clicked', () => {
    const onExitSpy = vi.spyOn(component, 'onExit');

    clickElementBySelector(fixture, '.exit');

    expect(onExitSpy).toHaveBeenCalled();
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });
});
