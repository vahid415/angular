import { PopupDialogComponent } from './popup-dialog.component';
import { NgModule } from '@angular/core';
import { DxComponentsModule } from '../../devextreme/dx.module';


const DxModule = [
  DxComponentsModule
];



@NgModule({
  imports: [...DxModule],
  declarations: [PopupDialogComponent],
  exports: [PopupDialogComponent]
})
export class PopupModule { }
