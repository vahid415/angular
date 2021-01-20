import { DxButtonModule, DxTextBoxModule } from 'devextreme-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';

@NgModule({
  declarations: [
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    DxButtonModule,
    DxTextBoxModule
  ],
  exports: [
    FileUploadComponent
  ]
})
export class FileUploadModule { }
