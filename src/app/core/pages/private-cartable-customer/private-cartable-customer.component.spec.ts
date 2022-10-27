import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCartablecustomerComponent } from './private-cartable-customer.component';

describe('PrivateCartableComponent', () => {
  let component: PrivateCartablecustomerComponent;
  let fixture: ComponentFixture<PrivateCartablecustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateCartablecustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateCartablecustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
