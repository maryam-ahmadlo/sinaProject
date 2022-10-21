import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarResultComponent } from './similar-result.component';

describe('SimilarResultComponent', () => {
  let component: SimilarResultComponent;
  let fixture: ComponentFixture<SimilarResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SimilarResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimilarResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
