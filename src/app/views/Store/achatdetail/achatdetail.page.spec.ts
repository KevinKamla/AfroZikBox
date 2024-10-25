import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AchatdetailPage } from './achatdetail.page';

describe('AchatdetailPage', () => {
  let component: AchatdetailPage;
  let fixture: ComponentFixture<AchatdetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AchatdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
