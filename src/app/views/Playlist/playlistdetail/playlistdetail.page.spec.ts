import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaylistdetailPage } from './playlistdetail.page';

describe('PlaylistdetailPage', () => {
  let component: PlaylistdetailPage;
  let fixture: ComponentFixture<PlaylistdetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
