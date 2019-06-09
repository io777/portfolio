import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjUpdateComponent } from './proj-update.component';

describe('ProjUpdateComponent', () => {
  let component: ProjUpdateComponent;
  let fixture: ComponentFixture<ProjUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
