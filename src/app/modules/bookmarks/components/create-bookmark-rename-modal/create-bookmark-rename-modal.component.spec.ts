import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBookmarkRenameModalComponent } from './create-bookmark-rename-modal.component';

describe('CreateBookmarkRenameModalComponent', () => {
  let component: CreateBookmarkRenameModalComponent;
  let fixture: ComponentFixture<CreateBookmarkRenameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CreateBookmarkRenameModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBookmarkRenameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
