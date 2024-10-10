import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddplaylistPage } from './addplaylist.page';

describe('AddplaylistPage', () => {
  let component: AddplaylistPage;
  let fixture: ComponentFixture<AddplaylistPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddplaylistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
