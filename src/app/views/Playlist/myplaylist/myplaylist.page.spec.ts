import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyplaylistPage } from './myplaylist.page';

describe('MyplaylistPage', () => {
  let component: MyplaylistPage;
  let fixture: ComponentFixture<MyplaylistPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyplaylistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
