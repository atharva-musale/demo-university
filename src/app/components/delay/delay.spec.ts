import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DelayComponent } from './delay';

describe('DelayComponent', () => {
  let component: DelayComponent;
  let fixture: ComponentFixture<DelayComponent>;

  beforeEach(async () => {
    vi.useFakeTimers();

    await TestBed.configureTestingModule({
      imports: [DelayComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DelayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('check for 500ms bool is still false', () => {

    vi.advanceTimersByTime(500);
    expect(component.bool).toBe(false);
  });

  it('should change the bool after delay', () => {

    vi.advanceTimersByTime(1000);
    expect(component.bool).toBe(true);
  });
});
