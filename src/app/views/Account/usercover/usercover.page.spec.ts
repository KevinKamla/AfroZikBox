import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsercoverPage } from './usercover.page';

describe('UsercoverPage', () => {
  let component: UsercoverPage;
  let fixture: ComponentFixture<UsercoverPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
