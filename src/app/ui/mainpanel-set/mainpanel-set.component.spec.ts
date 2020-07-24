import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainpanelSetComponent } from './mainpanel-set.component';

describe('MainpanelSetComponent', () => {
  let component: MainpanelSetComponent;
  let fixture: ComponentFixture<MainpanelSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainpanelSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainpanelSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
