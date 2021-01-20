import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MasterFormComponent } from './master-form.component';
import { MainPanelModule } from '../../main-panel/main-panel.module';
import { UtilsModule } from './../../../../shared/utils/utils.module';
import { ToggleBtnModule } from './../../toggle-btn/toggle-btn.module';
import { SecurityModule } from './../../../../../portal/security/security.module';
import { LocalizationModule } from '../../../../shared/localization/localization.module';
import { DxComponentsModule } from '../../../devextreme/dx.module';
import { PopupModule } from '../../popup/popup.module';

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
  imports: [...DxModule, ...AppCoreModules],
  declarations: [MasterFormComponent],
  exports: [MasterFormComponent]
})
export class MasterFormModule { }
