import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeleteUserModalComponent } from './create-delete-user-modal.component';

describe('CreateDeleteUserModalComponent', () => {
  let component: CreateDeleteUserModalComponent;
  let fixture: ComponentFixture<CreateDeleteUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CreateDeleteUserModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDeleteUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
