import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsOrdersComponent } from './admins-orders.component';

describe('AdminsOrdersComponent', () => {
  let component: AdminsOrdersComponent;
  let fixture: ComponentFixture<AdminsOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminsOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
