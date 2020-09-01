import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputUserDataFormComponent } from './input-user-data-form.component';

describe('InputUserDataFormComponent', () => {
  let component: InputUserDataFormComponent;
  let fixture: ComponentFixture<InputUserDataFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputUserDataFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputUserDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
