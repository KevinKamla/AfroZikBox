import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdituserinfoPage } from './edituserinfo.page';

describe('EdituserinfoPage', () => {
  let component: EdituserinfoPage;
  let fixture: ComponentFixture<EdituserinfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EdituserinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
