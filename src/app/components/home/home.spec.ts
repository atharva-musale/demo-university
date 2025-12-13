import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { clickElementBySelector } from '../../testing';

const mockRouter = {
  navigate: vi.fn(),
  events: new BehaviorSubject<NavigationEnd>(new NavigationEnd(1, '/home', '/home')),
  currentNavigation: vi.fn().mockReturnValue({
    extras: {
      state: { error: 'Sample error message'}
    }
  })
}

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message on NavigationEnd with error state', async () => {
    mockRouter.events.next(new NavigationEnd(2, '/home', '/home'));
    fixture.detectChanges();

    const error = await firstValueFrom(component.errorMessage$);
    expect(error).toBe('Sample error message');
  });

  it('should navigate to specified route', () => {
    clickElementBySelector(fixture, '.go-admin');

    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });
});
