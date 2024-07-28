import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserlockPage } from './userlock.page';

describe('UserlockPage', () => {
  let component: UserlockPage;
  let fixture: ComponentFixture<UserlockPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserlockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
