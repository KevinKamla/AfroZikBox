import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DevenirartistePage } from './devenirartiste.page';

describe('DevenirartistePage', () => {
  let component: DevenirartistePage;
  let fixture: ComponentFixture<DevenirartistePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DevenirartistePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
