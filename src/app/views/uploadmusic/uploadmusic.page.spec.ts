import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadmusicPage } from './uploadmusic.page';

describe('UploadmusicPage', () => {
  let component: UploadmusicPage;
  let fixture: ComponentFixture<UploadmusicPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadmusicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
