import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymobilPage } from './paymobil.page';

describe('PaymobilPage', () => {
  let component: PaymobilPage;
  let fixture: ComponentFixture<PaymobilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymobilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
