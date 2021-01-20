import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from '../pipes/image.pipe';


const DECLARATIONS = [
  ImagePipe,
];
@NgModule({
  declarations: DECLARATIONS,

  imports: [
    CommonModule
  ],
  exports: [
    ...DECLARATIONS
  ]
})
export class UtilsModule {
}
