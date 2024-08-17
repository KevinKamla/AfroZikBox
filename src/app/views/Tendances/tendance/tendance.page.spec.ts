import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TendancePage } from './tendance.page';

describe('TendancePage', () => {
  let component: TendancePage;
  let fixture: ComponentFixture<TendancePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
