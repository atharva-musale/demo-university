import { BehaviorSubject } from "rxjs";
import { vi } from "vitest";
import { AuthenticationService } from "./auth.service";

export class AuthenticationServiceFixture implements Readonly<AuthenticationService> {
  public isAuthenticated$ = new BehaviorSubject(false);
  public isAuthenticatedInstant$ = new BehaviorSubject(false);

  public grantAccess = vi.fn();

  public revokeAccess = vi.fn();
}
