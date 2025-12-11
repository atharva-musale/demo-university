import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { AuthenticationService } from "../../services";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  public canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated$.pipe(map(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigate(['home'], {
          state: {
            error: 'Only authenticated users can access the admin section. Please follow the instructions given in the section below to authenticate yourself.'
          }
        });
        // Block the original navigation
        return false;
      }
      return true;
    }));
  }
}
