import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRuleComponent } from './confirm-rule.component';

describe('ConfirmRuleComponent', () => {
  let component: ConfirmRuleComponent;
  let fixture: ComponentFixture<ConfirmRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ConfirmRuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
