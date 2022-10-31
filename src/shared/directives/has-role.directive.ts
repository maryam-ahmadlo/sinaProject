import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { NgIfContext } from '@angular/common';
import { hasRole as hasRoleUtils } from '../utils';

@Directive({
  selector: '[hasRole]',
})
export class HasRoleDirective implements OnChanges {
  private allowedRoles: string[] = [];
  elseTemplateRef: TemplateRef<any>;

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input()
  set hasRole(allowedRoles: string[]) {
    this.allowedRoles = allowedRoles;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['hasRole']['previousValue'] !== changes['hasRole']['currentValue']
    )
      this.updateView();
  }

  @Input()
  set hasRoleElse(templateRef: TemplateRef<NgIfContext> | null) {
    this.elseTemplateRef = templateRef;
  }

  private updateView() {
    if (hasRoleUtils(this.allowedRoles)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      if (this.elseTemplateRef) {
        this.viewContainer.createEmbeddedView(this.elseTemplateRef);
      } else {
        this.viewContainer.clear();
      }
    }
  }
}
