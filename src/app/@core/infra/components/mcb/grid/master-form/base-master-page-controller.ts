import {OnInit, QueryList, ViewChild, ViewChildren, Component} from '@angular/core';
import {DxTabPanelComponent} from 'devextreme-angular';
import { MasterFormComponent } from './master-form.component';
import { BaseDetailPageController } from '../../detail-form/base-detail-page-controller';
import { GenericCrudService, MasterFormModel } from '../type';
import { Tab } from 'app/@core/infra/shared/types/tab-panel';

@Component({
  template: ''
})

export class BaseMasterPageController implements OnInit {

  @ViewChild('entityMasterEditForm') entityMasterEditForm;
  @ViewChild('detailTabsPanel') detailTabsPanel: DxTabPanelComponent;
  @ViewChildren('detailComponent') detailComponents: QueryList<BaseDetailPageController>;
  masterFormComponent: MasterFormComponent;
  selectedTabIndex = 0;
  masterFormModel: MasterFormModel = new MasterFormModel();
  masterFormService: GenericCrudService;
  selectedMasterEntity: any = {};


  constructor(masterFormService: GenericCrudService) {
    this.masterFormService = masterFormService;
  }

  ngOnInit(): void {
    this.initMasterFormLabels();
    this.initDataGridColumns();
    this.initDetailTabs();
  }


  initDataGridColumns() {

  }

  /*
  * Add Column to Master Form DataGrid
  * */
  addMasterGridColumn(column) {
    this.masterFormModel.addMasterGridColumn(column);
  }

  /*
  * Call Before Opening Add/Edit Form Popup Dialog
  * */
  beforeDialogOpen(example): boolean {
    this.initMasterEditForm(example);
    return true;
  }

  beforeSaveOrUpdate(example: any): boolean {
    return true;
  }

  public getMasterGridPageHelpModel() {
    return null;
  }

  public getPopUpHelpModel() {
    return null;
  }

  addDetailTab(tab: Tab) {
    this.masterFormModel.detailTabs.push(tab);
  }

  public initDetailTabs() {
  }

  public initMasterFormLabels() {

  }

  showAdvancedSearch() {
    this.masterFormModel.showAdvancedSearch = true;
  }



  getDetailTabs() {
    return this.masterFormModel.detailTabs;
  }

  selectedDetailTabChange(e: any) {
    const selectedDetailPage = this.detailComponents.filter((detailPage, index, allDetailPages) => {
      return +detailPage.tabIndex === e.addedItems[0].id - 1;
    });
    if (selectedDetailPage.length !== 0) {
      selectedDetailPage[0].getDetailFormComponent().reloadList();
    }
  }

  editSelectedMaster(data: any) {
    if (this.masterFormComponent) {
      this.masterFormComponent.editSelectedMaster(data);
    }
  }

  deleteSelectedMaster(data: any) {
    if (this.masterFormComponent) {
      this.masterFormComponent.deleteSelectedMaster(data);
    }
  }

  startSearch() {
    if (this.masterFormComponent) {
      this.masterFormComponent.searchMasterEntity();
    }
  }

  public hideHelpButton() {
    this.masterFormModel.showPopUpHelp = false;
  }

  setFormKey(formKey: string) {
    this.masterFormModel.formKey = formKey;
  }

  setMasterFormLabels(masterFormGridTitle, entityTitle, addBtnGridTitle) {
    this.masterFormModel.title = masterFormGridTitle;
    this.masterFormModel.entityTitle = entityTitle;
    this.masterFormModel.addBtnTitle = addBtnGridTitle;
  }

  private initMasterEditForm(example: any) {
    // set first tab
    if (this.detailTabsPanel) {
      this.detailTabsPanel.instance.option('selectedIndex', 0);
      // reload first tab detail grid list
      if (this.detailComponents.length !== 0) {
        this.detailComponents.first.tabIndex = 0;
        this.detailComponents.first.getDetailFormComponent().reloadList();
      }
    }
  }

}
