import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewestResultComponent } from './newest-result.component';

describe('NewestResultComponent', () => {
  let component: NewestResultComponent;
  let fixture: ComponentFixture<NewestResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NewestResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
