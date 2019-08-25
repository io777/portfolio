import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContactListComponent } from './admin-contact-list.component';

describe('AdminContactListComponent', () => {
  let component: AdminContactListComponent;
  let fixture: ComponentFixture<AdminContactListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminContactListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
