import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MusicaimePage } from './musicaime.page';

describe('MusicaimePage', () => {
  let component: MusicaimePage;
  let fixture: ComponentFixture<MusicaimePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicaimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
