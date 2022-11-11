import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartableConfirmedListComponent } from './cartable-confirmed-list.component';

describe('CartableConfirmedListComponent', () => {
  let component: CartableConfirmedListComponent;
  let fixture: ComponentFixture<CartableConfirmedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CartableConfirmedListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartableConfirmedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
