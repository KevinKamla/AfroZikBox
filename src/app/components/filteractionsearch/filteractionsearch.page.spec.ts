import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilteractionsearchPage } from './filteractionsearch.page';

describe('FilteractionsearchPage', () => {
  let component: FilteractionsearchPage;
  let fixture: ComponentFixture<FilteractionsearchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteractionsearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
