import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { HttpParams } from '@angular/common/http';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { confirm } from 'devextreme/ui/dialog';
import { BaseMasterPageController } from './base-master-page-controller';
import { ClientSearchParameters, PageResponse, Sort } from 'app/@core/public-api';
import { PopupDialogComponent } from '../../popup/popup-dialog.component';
import { MessageService } from 'app/@core/infra/shared/services/message.service';

declare var introJs: any;

@Component({
  selector: 'rnx-master-form',
  templateUrl: './master-form.component.html',
})
export class MasterFormComponent implements OnInit {
  @Input() controller: BaseMasterPageController;
  @Input() operationsTemplate: TemplateRef<any>;
  @Input() openInPopUp = false;
  @Output() valueChange: EventEmitter<any>;
  @Output() onSelect: EventEmitter<any>;

  @ViewChild('dataGridComponent') dt: DxDataGridComponent;
  @ViewChild('addEditDialog') addEditDialog: PopupDialogComponent;
  @BlockUI('tab-list') blockUI: NgBlockUI;
  confirmDeleteMessage: string = '';
  store: CustomStore;
  gridDataSource: any = {};


  constructor(private ts: TranslateService,
    private cd: ChangeDetectorRef,
    private messageService: MessageService) {
    this.valueChange = new EventEmitter<any>();
    this.onSelect = new EventEmitter<any>();
    // init data grid
    const that = this;
    this.store = new CustomStore({
      key: 'id',
      load: (loadOptions) => {
        if (this.controller.masterFormService.firstLoad) {
          this.controller.masterFormService.firstLoad = false;
          return Promise.resolve(
            {
              data: [],
              totalCount: 0
              /*summary: result.summary,
               groupCount: result.groupCount*/
            }
          );
        }
        let params: HttpParams = new HttpParams();
        [
          'skip',
          'take',
          'requireTotalCount',
          'requireGroupCount',
          'sort',
          'filter',
          'totalSummary',
          'group',
          'groupSummary'
        ].forEach(function (i) {
          if (i in loadOptions && that.isNotEmpty(loadOptions[i]))
            params = params.set(i, JSON.stringify(loadOptions[i]));
        });
        const sp: ClientSearchParameters = new ClientSearchParameters();
        sp.take = String(loadOptions['take']);
        sp.dataField = String(loadOptions['dataField']);
        sp.skip = String(loadOptions['skip']);
        sp.requireTotalCount = String(loadOptions['requireTotalCount']);
        if (loadOptions['sort']) {
          for (const sort of loadOptions['sort']) {
            const ss: Sort = new Sort(String(sort.selector), String(sort.desc));
            sp.sort.push(ss);
          }
        }
        return this.controller.masterFormService.getPage(params, sp)
          .toPromise()
          .then((result: PageResponse<any>) => {
            return {
              data: result.content,
              totalCount: result.totalElements
              /*summary: result.summary,
               groupCount: result.groupCount*/
            };
          }, error => {
            this.messageService.errorMessage('core.dao.can_not_access_server', null);
          });
      },
      remove: (key) => {
        const result: Promise<any> = this.controller.masterFormService.delete(key, that.controller.selectedMasterEntity)
          .toPromise()
          .then(response => {
            that.messageService.infoMessage('general.delete_successful_message',
              { itemName: that.controller.masterFormModel.entityTitle + ' ' + that.controller.masterFormService.toString(that.controller.selectedMasterEntity) });
            this.controller.selectedMasterEntity = null;
            return this.controller.selectedMasterEntity;
          }, error => {
            that.messageService.errorMessage('general.delete_failed_message',
              { itemName: that.controller.masterFormModel.entityTitle + ' ' + that.controller.masterFormService.toString(that.controller.selectedMasterEntity) });
            return new Error('delete is impossible!');
          });
        return result;
      },
      insert: function (values) {
        return that.controller.masterFormService.update(values, null)
          .toPromise()
          .then(response => {
            // TODO Check After Save for Detail Tabs
            that.showUpdateChildrenDialog(response);
            that.messageService.infoMessage('general.save_successful_message',
              { itemName: that.controller.masterFormModel.entityTitle + ' ' + that.controller.masterFormService.toString(values) });
            that.controller.selectedMasterEntity = response;
            return that.controller.selectedMasterEntity;
          }, error => {
            that.messageService.errorMessage('general.save_failed_message',
              { itemName: that.controller.masterFormModel.entityTitle + ' ' + that.controller.masterFormService.toString(values) });
            return new Error('insert is impossible!');
          });
      },
      update: function (key, values) {
        return that.controller.masterFormService.update(values, key)
          .toPromise()
          .then(response => {
            that.addEditDialog.closeDialog(true);
            that.messageService.infoMessage('general.update_successful_message',
              { itemName: that.controller.masterFormModel.entityTitle + ' ' + that.controller.masterFormService.toString(values) });
            that.controller.selectedMasterEntity = response;
            return response;
          }, error => {
            that.messageService.errorMessage('general.update_failed_message',
              { itemName: that.controller.masterFormModel.entityTitle + ' ' + that.controller.masterFormService.toString(values) });
            return new Error('update is impossible!');
          });
      }
    });
    this.gridDataSource.store = this.store;
  }

  @Input()
  get value() {
    return this.controller.selectedMasterEntity;
  }

  set value(value) {
    this.controller.selectedMasterEntity = value;
    this.valueChange.emit(this.controller.selectedMasterEntity);
  }

  ngOnInit(): void {
    this.controller.masterFormComponent = this;
  }

  showMasterGridPageHelp(e) {
    if (this.controller.masterFormModel.formKey) {
    }
  }

  showPopUpHelp(e) {
    if (this.controller.masterFormModel.formKey) {
    }
  }

  onDataGridToolbarPreparing(e: any) {
    if (!this.openInPopUp) {
      const toolbarItems = e.toolbarOptions.items;
      const that = this;
      // Modifies an existing item
      toolbarItems.forEach(function (item) {
        if (item.name === 'saveButton') {
          // Change the item options here
        }
      });
      // Adds a new item
      toolbarItems.push({
        widget: 'dxButton',
        options: {
          icon: 'add',
          rtlEnabled: 'true',
          elementAttr: { 'id': 'addEntityBtnId' },
          style: 'background: #337ab7',
          class: 'yekan',
          type: 'default',
          text: this.controller.masterFormModel.addBtnTitle,
          hint: this.controller.masterFormModel.addBtnTitle,
          onClick: function () {
            that.addNewMasterEntity();
          }
        },
        location: 'before'
      });
    }
  }

  addNewMasterEntity() {
    this.controller.selectedMasterEntity = {};
    const showDialog = this.controller.beforeDialogOpen(this.controller.selectedMasterEntity);
    this.valueChange.emit(this.controller.selectedMasterEntity);
    if (showDialog) {
      this.showBlockingUI();
      this.addEditDialog.showDialog(this.ts.instant('general.add') + this.controller.masterFormModel.entityTitle);
    }
  }

  hideBlockingUI() {
    this.blockUI.stop();
  }

  showBlockingUI() {
    this.blockUI.start(this.ts.instant('general.fill_form'));
  }

  /**
   * Invoked when user presses the search button.
   */
  searchMasterEntity() {
    if (this.controller.masterFormModel.isPopup) {
      this.controller.masterFormService.firstLoad = false;
    }
    this.dt.instance.getDataSource().reload();
  }

  saveMasterEntity(e: any) {
    const example: any = this.controller.selectedMasterEntity;
      const saveOrUpdate = this.controller.beforeSaveOrUpdate(example);
      if (saveOrUpdate) {
        if (example.id) {
          this.store.update(example.id, example)
            .then(res => {
              if (!res.message) {
                this.searchMasterEntity();
              }
            });
        } else {
          this.store.insert(example)
            .then(result => {
              if (!result.message) {
                this.searchMasterEntity();
              }
            });

        }
      }
  }

  isNotEmpty(value: any): boolean {
    return value !== undefined && value !== null && value !== '';
  }

  editSelectedMaster(example: any) {
    this.controller.masterFormService.findOne(example.id).subscribe(result => {
      this.controller.selectedMasterEntity = result;
      this.valueChange.emit(result);
      const showDialog = this.controller.beforeDialogOpen(this.controller.selectedMasterEntity);
      if (showDialog) {
        this.hideBlockingUI();
        this.addEditDialog.showDialog(this.ts.instant('general.entity_update',
          {
            itemName: this.controller.masterFormService.toString(result),
            entityTitle: this.controller.masterFormModel.entityTitle
          }));
      }
    });
  }

  deleteSelectedMaster(example: any) {
    if (example) {
      const id = example.id;
      this.controller.selectedMasterEntity = example;
      this.confirmDeleteMessage = this.ts.instant('general.delete_confirm_text',
        { itemName: this.controller.masterFormModel.entityTitle + this.controller.masterFormService.toString(example) });
      this.cd.detectChanges();
      this.dt.instance.deleteRow(this.dt.instance.getRowIndexByKey(id));
    }
  }

  showUpdateChildrenDialog(example: any) {
    if (this.controller.masterFormModel.detailTabs.length > 0) {
      const confirmSaveMessage = this.ts.instant('general.save_child_confirm_text',
        { itemName: this.controller.masterFormModel.entityTitle + ' ' + this.controller.masterFormService.toString(example) });
      const saveConfirmFormTitle = this.controller.masterFormModel.entityTitle;
      this.controller.selectedMasterEntity = example;
      const result = confirm(confirmSaveMessage, saveConfirmFormTitle);
      result.then(dialogResult => {
        if (dialogResult) {
          this.hideBlockingUI();
        } else {
          this.addEditDialog.closeDialog(true);
        }
      });
    } else {
      this.addEditDialog.closeDialog(true);
    }
  }

  selectEntityInPopupMode(entity: any) {
    this.onSelect.emit(entity);
  }
}
