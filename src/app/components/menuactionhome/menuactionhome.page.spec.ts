import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuactionhomePage } from './menuactionhome.page';

describe('MenuactionhomePage', () => {
  let component: MenuactionhomePage;
  let fixture: ComponentFixture<MenuactionhomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuactionhomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
