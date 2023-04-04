import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css'],
})
export class DateSelectorComponent implements OnInit {
  @Input() currentDate!: Date;
  @Output() emitDate = new EventEmitter<Date>();

  dateForm = this.fb.group({
    date: [this.currentDate],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.dateForm.get('date')?.setValue(this.currentDate);
  }

  valueChanged() {
    const dateValue = this.dateForm.get('date')?.value;
    if (dateValue) {
      this.emitDate.emit(dateValue);
    }
  }
}
