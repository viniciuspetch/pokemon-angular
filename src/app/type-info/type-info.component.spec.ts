import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeInfoComponent } from './type-info.component';

describe('TypeInfoComponent', () => {
  let component: TypeInfoComponent;
  let fixture: ComponentFixture<TypeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
