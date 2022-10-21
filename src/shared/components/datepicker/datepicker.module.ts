import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { DatepickerComponent } from './datepicker.component';
import { DatepickerDirective } from './datepicker.directive';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [DatepickerComponent, DatepickerDirective],
  exports: [DatepickerComponent, DatepickerDirective],
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
    NzTypographyModule,
    OverlayModule,
  ],
})
export class DatepickerModule {}
