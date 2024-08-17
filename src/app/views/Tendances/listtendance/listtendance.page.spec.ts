import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListtendancePage } from './listtendance.page';

describe('ListtendancePage', () => {
  let component: ListtendancePage;
  let fixture: ComponentFixture<ListtendancePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListtendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
