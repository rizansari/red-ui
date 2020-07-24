import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidepanelTreeComponent } from './sidepanel-tree.component';

describe('SidepanelTreeComponent', () => {
  let component: SidepanelTreeComponent;
  let fixture: ComponentFixture<SidepanelTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidepanelTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidepanelTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
