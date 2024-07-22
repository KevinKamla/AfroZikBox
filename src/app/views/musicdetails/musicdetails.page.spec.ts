import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MusicdetailsPage } from './musicdetails.page';

describe('MusicdetailsPage', () => {
  let component: MusicdetailsPage;
  let fixture: ComponentFixture<MusicdetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
