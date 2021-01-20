import {Input, ViewChild, Component} from '@angular/core';
import { GenericCrudService } from '../grid/type';
import {DetailFormModel} from './detail-form-model';
import { DetailFormComponent } from './detail-form.component';

@Component({
  template: ''
})


export abstract class BaseDetailPageController {
  entityDetailComponent: DetailFormComponent;
  @ViewChild('entityDetailEditForm') entityDetailEditForm;
  @Input() parent: any = {};
  @Input() tabIndex: number = 0;
  selectedDetailEntity: any = {};
  entityService: GenericCrudService;
  detailFormModel: DetailFormModel = new DetailFormModel();

  protected constructor(entityService: GenericCrudService) {
    this.entityService = entityService;
  }

  /*
* Add Column to Master Form DataGrid
* */
  addDetailGridColumn(column) {
    this.detailFormModel.addDetailGridColumn(column);
  }

  getDetailFormComponent() {
    return this.entityDetailComponent;
  }

  beforeAddEditDialogOpen(example: any): boolean {
    return true;
  }

  beforeSaveOrUpdate(example: any): boolean {
    return true;
  }

  deleteSelectedDetail(example: any) {
    if (this.entityDetailComponent) {
      this.entityDetailComponent.deleteSelectedDetail(example);
    }
  }

  editSelectedDetail(example: any) {

  }

  public getHelpModel() {
    return null;
  }

  abstract getParentFieldName(): string;

  setFormKey(formKey: string) {
    this.detailFormModel.formKey = formKey;
  }

  public hideHelpButton() {
    this.detailFormModel.showPopUpHelp = false;
  }
}
