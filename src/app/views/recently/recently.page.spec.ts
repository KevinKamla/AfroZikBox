import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecentlyPage } from './recently.page';

describe('RecentlyPage', () => {
  let component: RecentlyPage;
  let fixture: ComponentFixture<RecentlyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
