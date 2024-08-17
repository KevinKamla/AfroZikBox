import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailtendancePage } from './detailtendance.page';

describe('DetailtendancePage', () => {
  let component: DetailtendancePage;
  let fixture: ComponentFixture<DetailtendancePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailtendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
