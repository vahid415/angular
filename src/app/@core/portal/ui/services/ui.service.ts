import { Injectable, ViewContainerRef } from '@angular/core';

import { ConfirmMessage, Toast, } from './types';
import { UIMessageBrokerService } from './ui-message-broker.service';
import { TranslatorService } from '../../../infra/shared/localization/lang/translator.service';


@Injectable({
  providedIn: 'root'
})
export class UIService {
  constructor(
    private messageBroker: UIMessageBrokerService,
    private translator: TranslatorService
  ) {
  }

  showConfirm(titleKey: string, textKey: string, accept?: () => any, reject?: () => any) {
    this.messageBroker.confirm.emit({
      title: this.translator.translate(titleKey),
      text: this.translator.translate(textKey),
      accept,
      reject
    } as ConfirmMessage);
  }

  showModal(
    textKey: string,
    extraOptions?: {
      style?: 'success' | 'warning' | 'info' | 'error',
      timer?: number,
    }) {
    const modelObj = {
      textKey: this.translator.translate(textKey),
      extraOptions: {
        style: extraOptions && extraOptions.style ? extraOptions.style : 'error',
        timer: extraOptions && extraOptions.timer ? extraOptions.timer : null,
      }
    } as Toast;
    this.messageBroker.showModal.emit(modelObj);
  }

  showToast(
    textKey: string,
    extraOptions?: {
      style?: 'success' | 'warning' | 'info' | 'error',
      timer?: number,
      closable?: boolean,
      appendTo?: ViewContainerRef
    }) {

  }

  showLoading(show: boolean = true) {
    this.messageBroker.showLoading.emit(show);
  }
}
