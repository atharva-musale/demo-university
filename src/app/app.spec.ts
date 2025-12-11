import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { App } from './app';
import { AuthenticationService } from './services';
import { AuthenticationServiceFixture } from './services/fixtures';
import { clickElementByClass, getTextContentFromElementByClass } from './testing';
import { provideRouter } from '@angular/router';

describe.only('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let mockAuthService: AuthenticationServiceFixture;

  beforeEach(async () => {
    mockAuthService = new AuthenticationServiceFixture();
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        { provide: AuthenticationService, useValue: mockAuthService }
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    mockAuthService.isAuthenticatedInstant$.next(false);
    fixture.detectChanges();

    const logoText = getTextContentFromElementByClass(fixture, 'logo');

    expect(component).toBeTruthy();
    expect(logoText?.trim()).toBe('GUEST');
  });

  it('should update logo from guest to admin if logo is clicked', async () => {
    mockAuthService.isAuthenticatedInstant$.next(false);
    fixture.detectChanges();

    const logoTextBefore = getTextContentFromElementByClass(fixture, 'logo');
    expect(logoTextBefore?.trim()).toBe('GUEST');

    clickElementByClass(fixture, 'logo');
    await fixture.whenStable();

    mockAuthService.isAuthenticatedInstant$.next(true);
    fixture.detectChanges();

    const logoTextAfter = getTextContentFromElementByClass(fixture, 'logo');
    expect(mockAuthService.grantAccess).toHaveBeenCalled();
    expect(logoTextAfter?.trim()).toBe('ADMIN');
  });
});
