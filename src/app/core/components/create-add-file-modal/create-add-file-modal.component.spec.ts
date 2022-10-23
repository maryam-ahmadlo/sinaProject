import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAddFileModalComponent } from './create-add-file-modal.component';

describe('CreateAddFileModalComponent', () => {
  let component: CreateAddFileModalComponent;
  let fixture: ComponentFixture<CreateAddFileModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAddFileModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAddFileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
