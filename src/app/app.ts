import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthenticationService } from './services/authentication/auth.service';
import { firstValueFrom, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  /** Observable that emits the authentication status of the user. */
  public isAuthenticated$: Observable<boolean>;

  constructor(private authService: AuthenticationService) {
    this.isAuthenticated$ = this.authService.isAuthenticatedInstant$;
  }

  /**
   * Handles the click event on the logo.
   * If the user is authenticated, it revokes access; otherwise, it grants access.
   */
  public async logoClickHandler() {
    const isAuthenticated = await firstValueFrom(this.isAuthenticated$);
    if (isAuthenticated) {
      this.authService.revokeAccess();
    } else {
      this.authService.grantAccess();
    }
  }
}
