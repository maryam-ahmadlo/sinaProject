import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShowDraftComponent } from './create-show-draft.component';

describe('CreateShowDraftComponent', () => {
  let component: CreateShowDraftComponent;
  let fixture: ComponentFixture<CreateShowDraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CreateShowDraftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateShowDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
