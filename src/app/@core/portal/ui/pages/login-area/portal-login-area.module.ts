import { NgModule } from '@angular/core';
import { PortalLoginComponent } from './login/login.component';
import { PortalLoginAreaRoutingModule } from './portal-login-area-routing.module';
import { PortalLoginAreaLayoutComponent } from './layout/login-layout.component';
import { PortalLoginChooseOrganizationComponent } from './choose-organization/choose-organization.component';
import { CommonCoreModule } from '../../../../infra/shared/common-core.module';
import { PortalLoginChangePasswordComponent } from './change-password/change-password.component';
import { DxComponentsModule } from '../../../../infra/components/devextreme/dx.module';
import { InfraComponentsModule } from '../../../../infra/components/mcb/infra-components.module';
import { PortalReqChangePasswordComponent } from './req-change-password/req-change-password.component';

@NgModule({
  declarations: [
    PortalLoginAreaLayoutComponent,
    PortalLoginComponent,
    PortalLoginChooseOrganizationComponent,
    PortalLoginChangePasswordComponent,
    PortalReqChangePasswordComponent
  ],
  imports: [
    PortalLoginAreaRoutingModule,
    CommonCoreModule,
    DxComponentsModule,
    InfraComponentsModule,
  ],
  providers: [
  ]
})
export class PortalLoginAreaModule {
}
