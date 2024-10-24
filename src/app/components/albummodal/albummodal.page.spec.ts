import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbummodalPage } from './albummodal.page';

describe('AlbummodalPage', () => {
  let component: AlbummodalPage;
  let fixture: ComponentFixture<AlbummodalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbummodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
