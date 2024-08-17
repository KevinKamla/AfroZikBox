import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth2faPage } from './auth2fa.page';

describe('Auth2faPage', () => {
  let component: Auth2faPage;
  let fixture: ComponentFixture<Auth2faPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Auth2faPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
