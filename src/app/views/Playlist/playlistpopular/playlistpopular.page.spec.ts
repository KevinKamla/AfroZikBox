import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaylistpopularPage } from './playlistpopular.page';

describe('PlaylistpopularPage', () => {
  let component: PlaylistpopularPage;
  let fixture: ComponentFixture<PlaylistpopularPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistpopularPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
