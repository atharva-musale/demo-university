import { Injectable } from "@angular/core";
import { FormValidityChecker } from "../../models/form-validity";
import { CanDeactivate } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class FormValidityGuard implements CanDeactivate<FormValidityChecker> {
  public canDeactivate(component: FormValidityChecker): boolean {
    if (component.isFormValid()) {
      return true;
    }
    const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave this page?');
    return confirmLeave;
  }
}
