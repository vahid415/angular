import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatorPipe } from './lang/translator.pipe';
import { McbJalaliDatePipe } from './date/jalali-date.pipe';
import { DxMessageService } from './lang/dx-message.service';
import { MessageService } from '../services/message.service';

@NgModule({
  declarations: [
    McbJalaliDatePipe,
    TranslatorPipe
  ],
  imports: [
    CommonModule
  ],
  providers: [
    // { provide: LOCALE_ID, useValue: 'fa-IR' },
    { provide: MessageService, useClass: DxMessageService },
  ],
  exports: [
    McbJalaliDatePipe,
    TranslatorPipe
  ]
})
export class LocalizationModule {
}
