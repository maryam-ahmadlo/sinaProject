import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartableDraftListComponent } from './cartable-draft-list.component';

describe('CartableDraftListComponent', () => {
  let component: CartableDraftListComponent;
  let fixture: ComponentFixture<CartableDraftListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CartableDraftListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartableDraftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
