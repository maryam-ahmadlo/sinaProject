import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldestResultComponent } from './oldest-result.component';

describe('OldestResultComponent', () => {
  let component: OldestResultComponent;
  let fixture: ComponentFixture<OldestResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ OldestResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
