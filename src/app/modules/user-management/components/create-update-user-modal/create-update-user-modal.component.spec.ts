import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateUserModalComponent } from './create-update-user-modal.component';

describe('CreateUpdateUserModalComponent', () => {
  let component: CreateUpdateUserModalComponent;
  let fixture: ComponentFixture<CreateUpdateUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CreateUpdateUserModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
