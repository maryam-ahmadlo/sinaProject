import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditNodeModalComponent } from './create-edit-node-modal.component';

describe('CreateEditNodeModalComponent', () => {
  let component: CreateEditNodeModalComponent;
  let fixture: ComponentFixture<CreateEditNodeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CreateEditNodeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditNodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
