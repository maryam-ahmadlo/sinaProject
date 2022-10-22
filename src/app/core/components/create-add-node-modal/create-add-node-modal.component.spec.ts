import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAddNodeModalComponent } from './create-add-node-modal.component';

describe('CreateAddNodeModalComponent', () => {
  let component: CreateAddNodeModalComponent;
  let fixture: ComponentFixture<CreateAddNodeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CreateAddNodeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAddNodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
