import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MymusicPage } from './mymusic.page';

describe('MymusicPage', () => {
  let component: MymusicPage;
  let fixture: ComponentFixture<MymusicPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MymusicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
