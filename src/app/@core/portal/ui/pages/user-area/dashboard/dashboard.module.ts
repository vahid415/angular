import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CommonCoreModule } from '../../../../../infra/shared/common-core.module';
import { DxComponentsModule } from '../../../../../infra/components/devextreme/dx.module';
import { InfraComponentsModule } from '../../../../../infra/components/mcb/infra-components.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    CommonCoreModule,
    DxComponentsModule,
    InfraComponentsModule,
    NgbDatepickerModule,
    DashboardRoutingModule,
  ],
  providers: [
  ]
})
export class DashboardModule {
}
