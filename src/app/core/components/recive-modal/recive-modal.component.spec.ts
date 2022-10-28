import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciveModalComponent } from './recive-modal.component';

describe('ReciveModalComponent', () => {
  let component: ReciveModalComponent;
  let fixture: ComponentFixture<ReciveModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReciveModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReciveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
