import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddstoryPage } from './addstory.page';

describe('AddstoryPage', () => {
  let component: AddstoryPage;
  let fixture: ComponentFixture<AddstoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddstoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
