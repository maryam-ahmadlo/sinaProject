import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeRulesItemComponent } from './tree-rules-item.component';

describe('TreeRulesItemComponent', () => {
  let component: TreeRulesItemComponent;
  let fixture: ComponentFixture<TreeRulesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TreeRulesItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeRulesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
