import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumdetailPage } from './albumdetail.page';

describe('AlbumdetailPage', () => {
  let component: AlbumdetailPage;
  let fixture: ComponentFixture<AlbumdetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
