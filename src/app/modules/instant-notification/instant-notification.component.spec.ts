import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstantNotificationComponent } from './instant-notification.component';

describe('InstantNotificationComponent', () => {
  let component: InstantNotificationComponent;
  let fixture: ComponentFixture<InstantNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ InstantNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstantNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
