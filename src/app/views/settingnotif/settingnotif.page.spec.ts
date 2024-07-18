import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingnotifPage } from './settingnotif.page';

describe('SettingnotifPage', () => {
  let component: SettingnotifPage;
  let fixture: ComponentFixture<SettingnotifPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingnotifPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
