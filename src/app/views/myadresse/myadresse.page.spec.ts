import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyadressePage } from './myadresse.page';

describe('MyadressePage', () => {
  let component: MyadressePage;
  let fixture: ComponentFixture<MyadressePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyadressePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
