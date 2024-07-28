import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AffiliesPage } from './affilies.page';

describe('AffiliesPage', () => {
  let component: AffiliesPage;
  let fixture: ComponentFixture<AffiliesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
