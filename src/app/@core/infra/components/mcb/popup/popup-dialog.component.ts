import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';


@Component({
  templateUrl: 'popup-dialog.component.html',
  styleUrls: ['popup-dialog.component.scss'],
  selector: 'rnx-core-tab-panel'
})
export class PopupDialogComponent {

  @Input() title: string;
  @Input() icon: string;
  @Input() width: number;
  @Input() height: number;
  @Input() visible: boolean;
  @Input() fullscreen: boolean = true;
  @Input() disableScroll: boolean = false;
  @Input() showSave: boolean;
  @Input() showHelp: boolean = false;
  @Input() showClose: boolean = true;
  @Input() saveDisabled: boolean = true;
  @Input() preventEscape: boolean = false;
  @Output() onClose: EventEmitter<any>;
  @Output() onSave: EventEmitter<any>;
  @Output() onShowHelp: EventEmitter<any>;

  constructor(
    private ts: TranslateService,
  ) {
    this.onClose = new EventEmitter<boolean>();
    this.onSave = new EventEmitter<boolean>();
    this.onShowHelp = new EventEmitter<boolean>();
  }

  // beforeCloseDialog() {
  //   const confirmSaveMessage = '';
  //   const saveConfirmFormTitle = this.ts.instant('general.close_confirm_text');
  //   const result = confirm(saveConfirmFormTitle, confirmSaveMessage);
  //   result.then(res => {
  //     if (res) {
  //       this.closeDialog(true);
  //     }
  //   });
  // }
  closeDialog(event) {
    this.visible = false;
    this.onClose.emit(event);
  }


  showDialog(title: string, icon?: string) {
    this.title = title;
    this.icon = icon;
    this.visible = true;
  }

  onSaveClicked(event) {
    this.onSave.emit(event);
  }

  changeTitle(title: string) {
    this.title = title;
  }

  onShowHelpClicked(e: any) {
    this.onShowHelp.emit(true);
  }

  onInit(e: any) {
    if (this.preventEscape) {
      e.component.registerKeyHandler('escape', function (arg) {
        arg.stopPropagation();
      });
    }
  }
}
