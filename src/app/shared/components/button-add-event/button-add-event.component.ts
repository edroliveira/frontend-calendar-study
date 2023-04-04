import { Component, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  selector: 'app-button-add-event',
  template: `
    <button
      mat-raised-button
      color="primary"
      (click)="emitOpenDialog()"
      style="margin-top: 20px; border-radius: 20px;"
    >
      Add Event <mat-icon>add</mat-icon>
    </button>
  `,
})
export class ButtonAddEventComponent {
  @Output() openDialog = new EventEmitter();

  emitOpenDialog() {
    this.openDialog.emit();
  }
}
