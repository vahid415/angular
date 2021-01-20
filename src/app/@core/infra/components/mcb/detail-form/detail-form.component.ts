import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DxDataGridComponent} from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import {PopupDialogComponent} from '../popup/popup-dialog.component';

import {HttpParams} from '@angular/common/http';
import {BaseDetailPageController} from './base-detail-page-controller';
import { ClientSearchParameters, Sort, PageResponse } from 'app/@core/public-api';
import { MessageService } from 'app/@core/infra/shared/services/message.service';

declare var introJs: any;

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.scss']
})
export class DetailFormComponent implements OnInit {
  @Input() controller: BaseDetailPageController;
  @Input() operationsTemplate: TemplateRef<any>;
  @ViewChild('detailEntityEditDialog') detailEntityEditDialog: PopupDialogComponent;
  @Output() onBeforeSaveOrUpdate: EventEmitter<any>;
  @Output() valueChange: EventEmitter<any>;

  selectedDetailEntity: any = {};
  confirmDeleteMessage: any;
  detailGridDataSource: any = {};
  store: CustomStore;
  @ViewChild(DxDataGridComponent) dt: DxDataGridComponent;

  constructor(private ts: TranslateService,
              private cd: ChangeDetectorRef,
              private messageService: MessageService) {
    this.valueChange = new EventEmitter<any>();
    this.onBeforeSaveOrUpdate = new EventEmitter<any>();

    const that = this;
    this.store = new CustomStore({
      key: 'id',
      load: (loadOptions) => {
        if (!this.controller.parent.id) {
          return Promise.resolve(
            {
              data: [],
              totalCount: 0
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
        // set parent id
        const parent: string = this.controller.getParentFieldName();
        if (parent) {
          that.controller.entityService.example[parent] = {};
          if (parent && parent.indexOf('Id') >= 0) {
            that.controller.entityService.example[parent] = this.controller.parent.id;
          } else {
            that.controller.entityService.example[parent].id = this.controller.parent.id;
          }
        }
        return this.controller.entityService.getPage(params, sp)
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
        const result: Promise<any> = this.controller.entityService.delete(key, this.selectedDetailEntity)
          .toPromise()
          .then(response => {
            that.messageService.infoMessage('general.delete_successful_message',
              {itemName: that.controller.detailFormModel.entityTitle + ' ' + that.controller.entityService.toString(this.selectedDetailEntity)});
            this.selectedDetailEntity = null;
            return this.selectedDetailEntity;
          }, error => {
            that.messageService.errorMessage('general.delete_failed_message',
              {itemName: that.controller.detailFormModel.entityTitle + ' ' + that.controller.entityService.toString(this.selectedDetailEntity)});
            return new Error('delete is impossible!');
          });
        return result;
      },
      insert: function (values) {
        return that.controller.entityService.update(values, null)
          .toPromise()
          .then(response => {
            that.detailEntityEditDialog.closeDialog(values);
            that.messageService.infoMessage('general.save_successful_message',
              {itemName: that.controller.detailFormModel.entityTitle + ' ' + that.controller.entityService.toString(values)});
            that.selectedDetailEntity = response;
            return that.selectedDetailEntity;
          }, error => {
            that.messageService.errorMessage('general.save_failed_message',
              {itemName: that.controller.detailFormModel.entityTitle + ' ' + that.controller.entityService.toString(values)});
            return new Error('insert is impossible!');
          });
      },
      update: function (key, values) {
        return that.controller.entityService.update(values, key)
          .toPromise()
          .then(response => {
            that.detailEntityEditDialog.closeDialog(response);
            that.messageService.infoMessage('general.update_successful_message',
              {itemName: that.controller.detailFormModel.entityTitle + ' ' + that.controller.entityService.toString(values)});
            that.selectedDetailEntity = response;
            return that.selectedDetailEntity;
          }, error => {
            that.messageService.errorMessage('general.update_failed_message',
              {itemName: that.controller.detailFormModel.entityTitle + ' ' + that.controller.entityService.toString(values)});
            return new Error('update is impossible!');
          });
      }
    });
    this.detailGridDataSource.store = this.store;
  }

  @Input()
  get value() {
    return this.selectedDetailEntity;
  }

  set value(value) {
    this.selectedDetailEntity = value;
    this.valueChange.emit(this.selectedDetailEntity);
  }

  ngOnInit() {
    this.controller.entityDetailComponent = this;
  }

  saveDetailEntity($event: any) {
    const example: any = this.controller.selectedDetailEntity;
      const saveOrUpdate = this.controller.beforeSaveOrUpdate(example);
      if (saveOrUpdate) {
        if (example.id) {
          this.store.update(example.id, example)
            .then(res => {
              if (!res.message) {
                this.searchDetailEntity();
              }
            });
        } else {
          const parent: string = this.controller.getParentFieldName();
          if (parent) {
            example[parent] = {};
            if (parent && parent.indexOf('Id') >= 0) {
              example[parent] = this.controller.parent.id;
            } else {
              example[parent].id = this.controller.parent.id;
            }
          }
          this.store.insert(example)
            .then(result => {
              if (!result.message) {
                this.searchDetailEntity();
              }
            });

        }
      }
  }

  deleteSelectedDetail(example: any) {
    if (example) {
      const id = example.id;
      this.controller.selectedDetailEntity = example;
      this.confirmDeleteMessage = this.ts.instant('general.delete_confirm_text',
        {itemName: this.controller.detailFormModel.entityTitle + this.controller.entityService.toString(example)});
      this.cd.detectChanges();
      this.dt.instance.deleteRow(this.dt.instance.getRowIndexByKey(id));
    }
  }

  editSelectedDetail(example: any) {
    this.controller.entityService.findOne(example.id).subscribe(result => {
      this.selectedDetailEntity = result;
      this.valueChange.emit(result);
      const showDialog = this.controller.beforeAddEditDialogOpen(result);
      if (showDialog) {
        this.detailEntityEditDialog.showDialog(this.ts.instant('general.entity_update',
          {
            itemName: this.controller.entityService.toString(result),
            entityTitle: this.controller.detailFormModel.entityTitle
          }));
      }
    });
  }

  onDataGridToolbarPreparing(e) {
    const toolbarItems = e.toolbarOptions.items;
    const that = this;
    // Adds a new item
    toolbarItems.push({
      widget: 'dxButton',
      options: {
        icon: 'add',
        rtlEnabled: 'true',
        style: 'background: #337ab7',
        class: 'yekan',
        type: 'default',
        text: that.controller.detailFormModel.addDetailBtnTitle,
        // hint : this.translate.instant('add_course'),
        onClick: function () {
          that.addNewDetailEntity();
        }
      },
      location: 'before'
    });
  }

  reloadList() {
    this.dt.instance.getDataSource().reload();
  }

  addNewDetailEntity() {
    this.selectedDetailEntity = {};
    const showDialog = this.controller.beforeAddEditDialogOpen(this.selectedDetailEntity);
    this.valueChange.emit(this.selectedDetailEntity);
    if (showDialog) {
      this.detailEntityEditDialog.showDialog(this.controller.detailFormModel.title);
    }
  }

  isNotEmpty(value: any): boolean {
    return value !== undefined && value !== null && value !== '';
  }

  showHelpIntro(e) {
  }

  private searchDetailEntity() {
    this.dt.instance.getDataSource().reload();
  }

}
