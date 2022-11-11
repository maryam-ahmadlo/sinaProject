import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartableNotifiedListComponent } from './cartable-notified-list.component';

describe('CartableNotifiedListComponent', () => {
  let component: CartableNotifiedListComponent;
  let fixture: ComponentFixture<CartableNotifiedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CartableNotifiedListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartableNotifiedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
