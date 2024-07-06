import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BestSongsPage } from './best-songs.page';

describe('BestSongsPage', () => {
  let component: BestSongsPage;
  let fixture: ComponentFixture<BestSongsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BestSongsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
