import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoriesControlComponent } from './admin-categories-control.component';

describe('AdminCategoriesControlComponent', () => {
  let component: AdminCategoriesControlComponent;
  let fixture: ComponentFixture<AdminCategoriesControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCategoriesControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCategoriesControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
