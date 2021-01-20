import { NgModule } from '@angular/core';

import { PortalModalComponent } from './modal/modal.component';
import { PortalLoaderComponent } from './loader/loader.component';
import { PortalLayoutComponent } from './portal-layout.component';
import { PortalTooltipComponent } from './tooltip/tooltip.component';
import { PortalConfirmationDialogComponent } from './confimation-dialog/confirmation-dialog.component';
import { PortalUserChangePasswordComponent } from './user-change-password/user-change-password.component';

import { DxComponentsModule } from '../../../../../infra/components/devextreme/dx.module';
import { InfraComponentsModule } from '../../../../../infra/components/mcb/infra-components.module';
import { CommonCoreModule } from '../../../../../infra/shared/common-core.module';

@NgModule({
  declarations: [
    PortalModalComponent,
    PortalLayoutComponent,
    PortalLoaderComponent,
    PortalTooltipComponent,
    PortalConfirmationDialogComponent,
    PortalUserChangePasswordComponent
  ],
  imports: [
    CommonCoreModule,
    DxComponentsModule,
    InfraComponentsModule,
  ],
  providers: [
  ],
  exports: [
  ]
})
export class PortalLayoutModule {
}
