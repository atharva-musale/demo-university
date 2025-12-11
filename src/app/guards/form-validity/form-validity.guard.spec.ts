import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { firstValueFrom, of } from 'rxjs';

import { FormValidityGuard } from './form-validity.guard';
import { FormValidityChecker } from '../../models/form-validity';

describe('FormValidityGuard', () => {
  let guard: FormValidityGuard;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockDialog: { open: any };
  let mockComponent: FormValidityChecker;

  beforeEach(() => {
    mockDialog = {
      open: vi.fn()
    };

    mockComponent = {
      isFormValid: vi.fn()
    } as unknown as FormValidityChecker;

    TestBed.configureTestingModule({
      providers: [
        FormValidityGuard,
        { provide: MatDialog, useValue: mockDialog }
      ]
    });

    guard = TestBed.inject(FormValidityGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow deactivation when form is valid', async () => {
    mockComponent.isFormValid = vi.fn().mockReturnValue(true);
    const result = await firstValueFrom(guard.canDeactivate(mockComponent));

    expect(result).toBe(true);
  });

  it('should open dialog when form is invalid', async () => {
    mockComponent.isFormValid = vi.fn().mockReturnValue(false);
    mockDialog.open = vi.fn().mockReturnValue({
      afterClosed: () => of(true)
    });
    const result = await firstValueFrom(guard.canDeactivate(mockComponent));

    expect(result).toBe(true);
  });

  it('should prevent deactivation when user chooses to stay', async () => {
    mockComponent.isFormValid = vi.fn().mockReturnValue(false);
    mockDialog.open = vi.fn().mockReturnValue({
      afterClosed: () => of(false)
    });
    const result = await firstValueFrom(guard.canDeactivate(mockComponent));

    expect(result).toBe(false);
  });
});
