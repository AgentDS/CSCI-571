import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosTabComponent } from './photos-tab.component';

describe('PhotosTabComponent', () => {
  let component: PhotosTabComponent;
  let fixture: ComponentFixture<PhotosTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotosTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
