import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";

import { AuthService } from "./auth.service";
import { async } from "@angular/core/testing";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  private url: string;
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log(state.url);
    // this.auth.isAuthenticated().subscribe(result => {
    //   this.auth.isAuthed = result;
    //   console.log(this.auth.isAuthed, "%%%%%%%%");
    // });
    if (state.url === "/super") {
      // console.log(this.auth.isAuthed, "this.auth.isAuthed");
      // console.log(this.auth.isSuperAdmin, "this.auth.isSuperAdmin");
      // console.log(this.auth.isAuthed && this.auth.isSuperAdmin, "ISSUPERADMIN");
      return this.auth.isAuthed && this.auth.isSuperAdmin;
    } else {
      if (this.auth.isAuthed) {
        console.log(state.url, "######");
        return true;
      } else {
        this.router.navigate(["/login"]);
        return false;
      }
    }
  }
}
