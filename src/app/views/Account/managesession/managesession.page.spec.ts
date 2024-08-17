import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManagesessionPage } from './managesession.page';

describe('ManagesessionPage', () => {
  let component: ManagesessionPage;
  let fixture: ComponentFixture<ManagesessionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagesessionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
