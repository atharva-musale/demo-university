import { Injectable } from "@angular/core";
import { BehaviorSubject, delay, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isAuthenticatedSubject$ = new BehaviorSubject(false);

  /**
   * Emits the current authentication status instantly.
   */
  public isAuthenticatedInstant$ = this.isAuthenticatedSubject$.asObservable();

  /**
   * Takes 2 seconds to emit the authentication status to simulate a real-world async operation.
   */
  public isAuthenticated$: Observable<boolean>;

  constructor() {
    this.isAuthenticated$ = this.isAuthenticatedSubject$.pipe(delay(2000));
  }

  public grantAccess() {
    this.isAuthenticatedSubject$.next(true);
  }

  public revokeAccess() {
    this.isAuthenticatedSubject$.next(false);
  }
}
