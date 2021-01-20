import {Injectable} from '@angular/core';
import notify from 'devextreme/ui/notify';
import {TranslateService} from '@ngx-translate/core';
@Injectable()
export class MessageService {


  constructor(private ts: TranslateService) {
  }

  info(summary: string) {
    notify({
      message: summary,
      type: 'info',
      displayTime: 3000,
      width: 350,
      rtlEnabled: true
    });
  }

  error(summary: string) {
    notify({
      message: summary,
      type: 'error',
      displayTime: 3000,
      width: 350,
      rtlEnabled: true
    });
  }

  infoMessage(key: string, args: any) {
    this.info(this.ts.instant(key, args));
  }

  errorMessage(key: string, args?: any) {
    this.error(this.ts.instant(key, args));
  }
}
