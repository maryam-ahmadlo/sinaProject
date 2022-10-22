import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSendGroupMsgModalComponent } from './create-send-group-msg-modal.component';

describe('CreateSendGroupMsgModalComponent', () => {
  let component: CreateSendGroupMsgModalComponent;
  let fixture: ComponentFixture<CreateSendGroupMsgModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CreateSendGroupMsgModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSendGroupMsgModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
