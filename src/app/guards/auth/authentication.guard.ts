import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { map } from "rxjs";
import { AuthenticationService } from "../../services";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    console.error(route);
    console.error(state);

    return this.authService.isAuthenticated$.pipe(map(isLoggedIn => {
      console.log('AuthenticationGuard#canActivate called, isLoggedIn:', isLoggedIn);
      if (!isLoggedIn) {
        this.router.navigate(['home'], {
          state: {
            error: 'Only authenticated users can access the admin section. Please follow the instructions given in the section below to authenticate yourself.'
          }
        });
        return false; // Block the original navigation
      }
      return true;
    }));
  }
}
