import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaylistoptionPage } from './playlistoption.page';

describe('PlaylistoptionPage', () => {
  let component: PlaylistoptionPage;
  let fixture: ComponentFixture<PlaylistoptionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistoptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
