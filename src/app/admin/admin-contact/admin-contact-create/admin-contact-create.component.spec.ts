import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContactCreateComponent } from './admin-contact-create.component';

describe('AdminContactCreateComponent', () => {
  let component: AdminContactCreateComponent;
  let fixture: ComponentFixture<AdminContactCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminContactCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContactCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
