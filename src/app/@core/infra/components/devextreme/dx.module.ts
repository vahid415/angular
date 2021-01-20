import {NgModule} from '@angular/core';
import {
  DxAccordionModule,
  DxBoxModule,
  DxButtonModule,
  DxChartModule,
  DxCheckBoxModule,
  DxContextMenuModule,
  DxDataGridModule,
  DxDropDownBoxModule,
  DxFileUploaderModule,
  DxFunnelModule,
  DxHtmlEditorModule,
  DxListModule,
  DxLoadPanelModule,
  DxNumberBoxModule,
  DxPieChartModule,
  DxPopupModule,
  DxRadioGroupModule,
  DxScrollViewModule,
  DxSelectBoxModule,
  DxSwitchModule,
  DxTabPanelModule,
  DxTagBoxModule,
  DxTextAreaModule,
  DxTextBoxModule,
  DxTileViewModule,
  DxToolbarModule,
  DxTooltipModule,
  DxTreeListModule,
  DxTreeViewModule,
  DxValidatorModule
} from 'devextreme-angular';

const DEV_EXTREME_MODULES = [
  DxButtonModule,
  DxBoxModule,
  DxDataGridModule,
  DxListModule,
  DxLoadPanelModule,
  DxNumberBoxModule,
  DxPopupModule,
  DxScrollViewModule,
  DxSelectBoxModule,
  DxSwitchModule,
  DxTabPanelModule,
  DxTextAreaModule,
  DxTextBoxModule,
  DxToolbarModule,
  DxTooltipModule,
  DxTagBoxModule,
  DxAccordionModule,
  DxTreeViewModule,
  DxTreeListModule,
  DxValidatorModule,
  DxCheckBoxModule,
  DxContextMenuModule,
  DxFileUploaderModule,
  DxTileViewModule,
  DxRadioGroupModule,
  DxHtmlEditorModule,
  DxPieChartModule,
  DxChartModule,
  DxFunnelModule,
  DxTreeViewModule,
  DxDropDownBoxModule
];

@NgModule({
  declarations: [],
  imports: [
    ...DEV_EXTREME_MODULES
  ],
  exports: [
    ...DEV_EXTREME_MODULES
  ]
})
export class DxComponentsModule {
}
