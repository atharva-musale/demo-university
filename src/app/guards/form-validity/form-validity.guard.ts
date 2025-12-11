import { Injectable } from "@angular/core";
import { FormValidityChecker } from "../../models/form-validity";
import { CanDeactivate } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { InvalidFormDialog } from "../../components/invalid-form-dialog/invalid-form-dialog";
import { map, Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FormValidityGuard implements CanDeactivate<FormValidityChecker> {
  constructor(private dialog: MatDialog) {}

  public canDeactivate(component: FormValidityChecker): Observable<boolean> {
    if (component.isFormValid()) {
      return of(true);
    }

    return this.dialog.open(InvalidFormDialog).afterClosed().pipe(
      map(result => result)
    );
  }
}
