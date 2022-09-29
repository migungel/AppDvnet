import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoInvoiceComponent } from './info-invoice.component';

describe('InfoInvoiceComponent', () => {
  let component: InfoInvoiceComponent;
  let fixture: ComponentFixture<InfoInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
