import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowCustomersComponent } from './admin-show-customers.component';

describe('AdminShowCustomersComponent', () => {
  let component: AdminShowCustomersComponent;
  let fixture: ComponentFixture<AdminShowCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminShowCustomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminShowCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
