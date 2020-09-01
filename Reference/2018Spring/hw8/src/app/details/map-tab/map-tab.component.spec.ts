import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapTabComponent } from './map-tab.component';

describe('MapTabComponent', () => {
  let component: MapTabComponent;
  let fixture: ComponentFixture<MapTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
