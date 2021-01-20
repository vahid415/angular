import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-form-action',
  template: '' +
  '<ng-container *ngIf="useDefaultAction">' +
  '<dx-button type="submit" [icon]="\'save\'" class="mcb-btn mcb-btn-save">ذخیره</dx-button>\n' +
  '<dx-button [icon]="\'refresh\'" class="mcb-btn mcb-btn-cancel">انصراف</dx-button>' +
  '</ng-container>' +
  '<ng-content></ng-content>',
  host: {
    '[class]': '"mcb-form-action"'
  }
})
export class FormActionComponent {
  // private form_action_class = 'mcb-form-action'; This Line Produces AOT COMPILER ERROR!
  @Input() useDefaultAction = false;

  constructor() {
  }
}
