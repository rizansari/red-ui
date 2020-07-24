import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidepanelListComponent } from './sidepanel-list.component';

describe('SidepanelListComponent', () => {
  let component: SidepanelListComponent;
  let fixture: ComponentFixture<SidepanelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidepanelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidepanelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
