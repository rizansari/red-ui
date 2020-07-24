import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainpanelListComponent } from './mainpanel-list.component';

describe('MainpanelListComponent', () => {
  let component: MainpanelListComponent;
  let fixture: ComponentFixture<MainpanelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainpanelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainpanelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
