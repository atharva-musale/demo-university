import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { AuthenticationGuard } from './authentication.guard';
import { AuthenticationService } from '../../services';
import { AuthenticationServiceFixture } from '../../services/fixtures';
import { firstValueFrom } from 'rxjs';

describe('AuthenticationGuard', () => {
  let guard: AuthenticationGuard;
  let mockAuthService: AuthenticationServiceFixture;
  // eslint-disable-next-line no-empty-pattern, @typescript-eslint/no-explicit-any
  let mockRouter: { navigate: ([]: any[]) => void };

  beforeEach(() => {
    mockRouter = {
      navigate: vi.fn()
    };
    mockAuthService = new AuthenticationServiceFixture();

    TestBed.configureTestingModule({
      providers: [
        AuthenticationGuard,
        { provide: AuthenticationService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    });

    guard = TestBed.inject(AuthenticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow navigation when user is authenticated', async () => {
    mockAuthService.isAuthenticatedInstant$.next(true);
    mockAuthService.isAuthenticated$.next(true);

    const canActivate$ = guard.canActivate();
    const result = await firstValueFrom(canActivate$);

    expect(result).toBe(true);
  });

  it('should block navigation and redirect to home when user is not authenticated', async () => {
    mockAuthService.isAuthenticatedInstant$.next(false);
    mockAuthService.isAuthenticated$.next(false);

    const canActivate$ = guard.canActivate();
    const result = await firstValueFrom(canActivate$);

    expect(result).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['home'], {
      state: {
        error: 'Only authenticated users can access the admin section. Please follow the instructions given in the section below to authenticate yourself.'
      }
    });
  });
});
