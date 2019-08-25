import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContactUpdateComponent } from './admin-contact-update.component';

describe('AdminContactUpdateComponent', () => {
  let component: AdminContactUpdateComponent;
  let fixture: ComponentFixture<AdminContactUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminContactUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContactUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
