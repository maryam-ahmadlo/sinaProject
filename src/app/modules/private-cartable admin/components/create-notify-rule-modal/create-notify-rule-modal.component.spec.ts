import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNotifyRuleModalComponent } from './create-notify-rule-modal.component';

describe('CreateNotifyRuleModalComponent', () => {
  let component: CreateNotifyRuleModalComponent;
  let fixture: ComponentFixture<CreateNotifyRuleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CreateNotifyRuleModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNotifyRuleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
