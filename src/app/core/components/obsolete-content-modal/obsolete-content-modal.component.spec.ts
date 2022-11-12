import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObsoleteContentModalComponent } from './obsolete-content-modal.component';

describe('ObsoleteContentModalComponent', () => {
  let component: ObsoleteContentModalComponent;
  let fixture: ComponentFixture<ObsoleteContentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ObsoleteContentModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObsoleteContentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
