import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainpanelStringComponent } from './mainpanel-string.component';

describe('MainpanelStringComponent', () => {
  let component: MainpanelStringComponent;
  let fixture: ComponentFixture<MainpanelStringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainpanelStringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainpanelStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
