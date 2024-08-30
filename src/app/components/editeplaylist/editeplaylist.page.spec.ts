import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditeplaylistPage } from './editeplaylist.page';

describe('EditeplaylistPage', () => {
  let component: EditeplaylistPage;
  let fixture: ComponentFixture<EditeplaylistPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditeplaylistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
