import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBookamrkDeleteModalComponent } from './create-bookamrk-delete-modal.component';

describe('CreateBookamrkDeleteModalComponent', () => {
  let component: CreateBookamrkDeleteModalComponent;
  let fixture: ComponentFixture<CreateBookamrkDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CreateBookamrkDeleteModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBookamrkDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
