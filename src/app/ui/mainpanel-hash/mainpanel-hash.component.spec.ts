import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainpanelHashComponent } from './mainpanel-hash.component';

describe('MainpanelHashComponent', () => {
  let component: MainpanelHashComponent;
  let fixture: ComponentFixture<MainpanelHashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainpanelHashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainpanelHashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
