import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteaccountPage } from './deleteaccount.page';

describe('DeleteaccountPage', () => {
  let component: DeleteaccountPage;
  let fixture: ComponentFixture<DeleteaccountPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteaccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
