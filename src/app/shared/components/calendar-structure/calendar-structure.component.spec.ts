import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarStructureComponent } from './calendar-structure.component';

describe('CalendarStructureComponent', () => {
  let component: CalendarStructureComponent;
  let fixture: ComponentFixture<CalendarStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarStructureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
