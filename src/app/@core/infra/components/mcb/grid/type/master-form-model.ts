import { MasterGridColumnType } from './enum/mcb-grid-column-type';

import DevExpress from 'devextreme/bundles/dx.all';
import { Tab } from 'app/@core/infra/shared/types/tab-panel';

export class MasterFormModel {
  title: string = '';
  entityTitle: string = '';
  entity: string = '';
  showHelp: boolean = true;
  showPopUpHelp: boolean = true;
  addBtnTitle: string = '';
  isPopup: boolean = false;
  exportFileName = 'Exported-Data';
  showAdvancedSearch = false;
  masterGridColumnsModel: Array<DevExpress.ui.dxDataGridColumn> = [];
  detailTabs: Tab[] = [];
  formKey: string;
  editPopUpConfig: EditPopUpConfig = new EditPopUpConfig(true);
  constructor() {
  }

  addMasterGridColumn(column: any) {
    this.masterGridColumnsModel.push(column);
  }
}


export class MasterFormColumn {
  field: string;
  title?: string;
  format?: any;
  cellTemplate?: (cellElement: HTMLElement, cellInfo: any) => string;
  sortable?: boolean;
  align?: 'left | right | center';
  type?: MasterGridColumnType;
  locked?: boolean;
  width?: number;

}
export class MasterFormToolbarBtn {
  type?: string;
  title: string;
  permission?: string;
  icon?: string;
  disabled?: boolean | ((event: Event) => any);
  primary?: boolean;
  class?: string;
  iconClass?: string;
  click?: (event: Event) => any;
}

export class EditPopUpConfig {
  fullScreen = true;
  width: string;

  constructor(fullScreen: boolean) {
    this.fullScreen = fullScreen;
  }
}
