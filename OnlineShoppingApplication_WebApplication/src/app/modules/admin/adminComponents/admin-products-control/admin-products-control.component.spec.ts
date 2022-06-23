import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductsControlComponent } from './admin-products-control.component';

describe('AdminProductsControlComponent', () => {
  let component: AdminProductsControlComponent;
  let fixture: ComponentFixture<AdminProductsControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductsControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
