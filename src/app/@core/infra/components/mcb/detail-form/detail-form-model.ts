import DevExpress from 'devextreme/bundles/dx.all';

export class DetailFormModel {
  title = '';
  entityTitle = '';
  addDetailBtnTitle;
  detailGridColumnsModel: Array<DevExpress.ui.dxDataGridColumn> = [];
  exportFileName = 'Exported-Detail-Data';
  showPopUpHelp: boolean = true;
  formKey: string;
  constructor() {
  }

  addDetailGridColumn(col: any) {
    this.detailGridColumnsModel.push(col);
  }
}
