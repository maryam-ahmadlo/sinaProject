import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortalDirective } from '@angular/cdk/portal';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { DatepickerComponent } from './datepicker.component';
import * as moment from 'jalali-moment';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDatepicker]',
})
export class DatepickerDirective implements OnInit, AfterViewInit {
  componentPortal: ComponentPortal<DatepickerComponent> = new ComponentPortal(
    DatepickerComponent
  );

  @Input() locale: string = 'fa';
  @Input() canChangeNavMonthLogic: any;
  @Input() isAvailableLogic: any;
  @Input() format: string = 'YYYY-MM-DD';

  @Input()
  public reference: HTMLElement;

  protected overlayRef: OverlayRef;

  public showing = false;

  constructor(
    protected overlay: Overlay,
    private elementRef: ElementRef,
    private control: NgControl
  ) {}

  public show() {
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    const componentRef = this.overlayRef.attach(this.componentPortal);
    componentRef.instance['value'] = (
      this.elementRef || (this.reference as any)
    ).nativeElement.value;
    componentRef.instance['locale'] = this.locale;
    componentRef.instance['canChangeNavMonthLogic'] =
      this.canChangeNavMonthLogic;
    componentRef.instance['isAvailableLogic'] = this.isAvailableLogic;
    componentRef.instance['emitSelectedDate'].subscribe((v) =>
      this.handleValue(v)
    );
    this.syncWidth();
    this.overlayRef.backdropClick().subscribe(() => this.hide());
    this.showing = true;
  }

  ngOnInit() {
    this.control.value && this.setValue(this.control.value);
  }

  ngAfterViewInit() {
    // this.control.control.valueChanges.subscribe((v) => {
    //   if (v) {
    //     this.setValue(typeof v === 'number' ? v : moment(v).format('X'));
    //   }
    // });
  }

  private setValue(data :any) {
    if (data) {
      let d = moment.unix(data);
      if (d.isValid()) {
        this.control.control.setValue(
          d.locale(this.locale).format(this.format)
        );
      }
    }
  }

  handleValue(value :any) {
    // (this.elementRef || (this.reference as any)).nativeElement.value = ;
    this.control.control.setValue(
      moment(value).locale(this.locale).format(this.format)
    );
    this.hide();
  }

  public hide() {
    this.overlayRef.detach();
    this.showing = false;
  }

  @HostListener('click')
  public onClick() {
    this.show();
  }

  @HostListener('window:resize')
  public onWinResize() {
    this.syncWidth();
  }

  protected getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.reference || this.elementRef)
      .withPush(false)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
        },
      ]);

    const scrollStrategy = this.overlay.scrollStrategies.reposition();

    return new OverlayConfig({
      positionStrategy: positionStrategy,
      scrollStrategy: scrollStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });
  }

  private syncWidth() {
    if (!this.overlayRef) {
      return;
    }

    // const refRect = (this.reference).getBoundingClientRect();
    // this.overlayRef.updateSize({ width: refRect.width });
  }
}
