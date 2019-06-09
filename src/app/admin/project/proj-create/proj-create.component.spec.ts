import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjCreateComponent } from './proj-create.component';

describe('ProjCreateComponent', () => {
  let component: ProjCreateComponent;
  let fixture: ComponentFixture<ProjCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
