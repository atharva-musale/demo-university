import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';

import { DisplayNamePipe } from './display-name.pipe';
import { FullName } from '../../models/name';
import { getTextContentFromElementBySelector } from '../../testing';

@Component({
  standalone: true,
  imports: [DisplayNamePipe],
  template: `<div class="display-name">{{ person | displayName }}</div>`
})
class MockComponent {
  @Input()
  person: FullName = { firstname: 'John', lastname: 'Doe' };
}

describe('DisplayNamePipe', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const pipe = new DisplayNamePipe();

    expect(pipe).toBeTruthy();
  });

  it('should display full name correctly in template', () => {
    const displayNameElement = getTextContentFromElementBySelector(fixture, '.display-name');

    expect(displayNameElement).toBe('John Doe');
  });

  it('should handle empty names gracefully', () => {
    fixture.componentRef.setInput('person', { firstname: '', lastname: '' });
    fixture.detectChanges();

    const displayNameElement = getTextContentFromElementBySelector(fixture, '.display-name');

    expect(displayNameElement).toBe(' ');
  });
});
