import { CommonModule } from '@angular/common';
import { DetailFormComponent } from './detail-form.component';
import { NgModule } from '@angular/core';
import { DxComponentsModule } from '../../devextreme/dx.module';
import { UtilsModule, SecurityModule, LocalizationModule } from 'app/@core/public-api';
import { PopupModule } from '../popup/popup.module';
import { ToggleBtnModule } from '../toggle-btn/toggle-btn.module';
import { MainPanelModule } from '../main-panel/main-panel.module';




const DxModule = [
  DxComponentsModule
];

const AppCoreModules = [
  UtilsModule,
  SecurityModule,
  PopupModule,
  ToggleBtnModule,
  MainPanelModule,
  LocalizationModule,
];

@NgModule({
  imports: [CommonModule, ...DxModule, ...AppCoreModules],
  declarations: [DetailFormComponent],
  exports: [DetailFormComponent]
})
export class DetailFormModule { }
