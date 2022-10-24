import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBookmarkShownModalComponent } from './create-bookmark-shown-modal.component';

describe('CreateBookmarkShownModalComponent', () => {
  let component: CreateBookmarkShownModalComponent;
  let fixture: ComponentFixture<CreateBookmarkShownModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CreateBookmarkShownModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBookmarkShownModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
