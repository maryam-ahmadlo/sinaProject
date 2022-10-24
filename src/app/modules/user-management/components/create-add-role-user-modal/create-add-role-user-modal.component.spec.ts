import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAddRoleUserModalComponent } from './create-add-role-user-modal.component';

describe('CreateAddRoleUserModalComponent', () => {
  let component: CreateAddRoleUserModalComponent;
  let fixture: ComponentFixture<CreateAddRoleUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CreateAddRoleUserModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAddRoleUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
