import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {
  private errorMessageSubject$ = new BehaviorSubject<string | null>(null);
  public errorMessage$ = this.errorMessageSubject$.asObservable();

  private subscription: Subscription[] = [];

  constructor(private router: Router) {
     this.subscription.push(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const err = this.router.currentNavigation()?.extras.state?.['error'] || null;
          this.errorMessageSubject$.next(err);
        }
      })
    );
  }

  public navigateTo(route: string) {
    this.router.navigate([route]);
  }

  public ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }
}
