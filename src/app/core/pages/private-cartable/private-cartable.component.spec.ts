import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCartableComponent } from './private-cartable.component';

describe('PrivateCartableComponent', () => {
  let component: PrivateCartableComponent;
  let fixture: ComponentFixture<PrivateCartableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateCartableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateCartableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
