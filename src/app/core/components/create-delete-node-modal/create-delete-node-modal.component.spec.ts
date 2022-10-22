import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeleteNodeModalComponent } from './create-delete-node-modal.component';

describe('CreateDeleteNodeModalComponent', () => {
  let component: CreateDeleteNodeModalComponent;
  let fixture: ComponentFixture<CreateDeleteNodeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CreateDeleteNodeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDeleteNodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
