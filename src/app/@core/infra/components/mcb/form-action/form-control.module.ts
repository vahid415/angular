import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormActionComponent } from './form-action.component';
import { DxButtonModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    FormActionComponent
  ],
  imports: [
    CommonModule,
    DxButtonModule
  ],
  exports: [
    FormActionComponent
  ]
})
export class FormActionModule { }
