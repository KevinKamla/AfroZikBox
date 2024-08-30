import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AfrozikstorePage } from './afrozikstore.page';

describe('AfrozikstorePage', () => {
  let component: AfrozikstorePage;
  let fixture: ComponentFixture<AfrozikstorePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AfrozikstorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
