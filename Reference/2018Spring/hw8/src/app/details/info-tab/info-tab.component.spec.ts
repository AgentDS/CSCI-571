import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTabComponent } from './info-tab.component';

describe('InfoTabComponent', () => {
  let component: InfoTabComponent;
  let fixture: ComponentFixture<InfoTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
