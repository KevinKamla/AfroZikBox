import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MusicoptionPage } from './musicoption.page';

describe('MusicoptionPage', () => {
  let component: MusicoptionPage;
  let fixture: ComponentFixture<MusicoptionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicoptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
