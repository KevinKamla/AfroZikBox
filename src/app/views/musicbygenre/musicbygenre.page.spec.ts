import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MusicbygenrePage } from './musicbygenre.page';

describe('MusicbygenrePage', () => {
  let component: MusicbygenrePage;
  let fixture: ComponentFixture<MusicbygenrePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicbygenrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
