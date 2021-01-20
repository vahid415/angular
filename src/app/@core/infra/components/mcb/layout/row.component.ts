import { Component } from '@angular/core';

@Component({
  selector: 'app-row',
  template: '<ng-content></ng-content>',
  host: {
    '[class]': '"row"'
  }
})
export class RowComponent {
}
