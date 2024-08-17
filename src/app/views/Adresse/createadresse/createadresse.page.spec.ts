import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateadressePage } from './createadresse.page';

describe('CreateadressePage', () => {
  let component: CreateadressePage;
  let fixture: ComponentFixture<CreateadressePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateadressePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
