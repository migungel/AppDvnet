import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsProductsComponent } from './points-products.component';

describe('PointsProductsComponent', () => {
  let component: PointsProductsComponent;
  let fixture: ComponentFixture<PointsProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointsProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
