import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-invalid-form-dialog',
  imports: [MatDialogModule],
  templateUrl: './invalid-form-dialog.html',
  styleUrl: './invalid-form-dialog.css',
})
export class InvalidFormDialog {
  constructor(public dialogRef: MatDialogRef<InvalidFormDialog>) {}

  /**
   * Close dialog and return true (user wants to exit)
   */
  public onExit() {
    this.dialogRef.close(true);
  }

  /**
   * Close dialog and return false (user wants to stay)
   */
  public onStay() {
    this.dialogRef.close(false);
  }
}
