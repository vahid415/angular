import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McbDatePickerComponent } from './date-picker.component';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DxButtonModule, DxPopupModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    McbDatePickerComponent
  ],
  imports: [
    CommonModule,
    DxButtonModule,
    DxPopupModule,
    FormsModule,
    NgbDatepickerModule
  ],
  exports: [
    McbDatePickerComponent
  ]
})
export class DatePickerModule { }
