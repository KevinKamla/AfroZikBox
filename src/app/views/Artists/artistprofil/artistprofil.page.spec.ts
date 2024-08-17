import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistprofilPage } from './artistprofil.page';

describe('ArtistprofilPage', () => {
  let component: ArtistprofilPage;
  let fixture: ComponentFixture<ArtistprofilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistprofilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
