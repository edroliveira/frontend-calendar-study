import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ISimpleSchedule } from '../../model/simple-schedule';

interface DialogData {
  title: string;
  time: number;
  date: Date;
}

@Component({
  selector: 'app-dialog-add-event',
  templateUrl: './dialog-add-event.component.html',
  styleUrls: ['./dialog-add-event.component.css'],
})
export class DialogAddEventComponent {
  eventData!: DialogData;
  eventDataForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    time: ['', Validators.required],
    date: ['', Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<DialogAddEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ISimpleSchedule[],
    private fb: FormBuilder
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  sendFormData() {
    this.eventData = Object.assign(
      {},
      this.eventData,
      this.eventDataForm.value
    );
    this.dialogRef.close(this.eventData);
  }
}
