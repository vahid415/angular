import { NgModule } from '@angular/core';

import { LayoutModule } from './layout/layout.module';
import { CheckboxModule } from './checkbox/checkbox.module';
import { MainPanelModule } from './main-panel/main-panel.module';
import { ToggleBtnModule } from './toggle-btn/toggle-btn.module';
import { DatePickerModule } from './date-picker/date-picker.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { FormActionModule } from './form-action/form-control.module';
import { FormControlModule } from './form-control/form-control.module';
import { MasterFormModule } from './grid/master-form/master-form.module';

@NgModule({
  exports: [
    LayoutModule,
    CheckboxModule,
    MainPanelModule,
    ToggleBtnModule,
    MasterFormModule,
    DatePickerModule,
    FileUploadModule,
    FormActionModule,
    FormControlModule,
  ]
})
export class InfraComponentsModule {
}
