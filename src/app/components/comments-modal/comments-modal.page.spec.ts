import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentsModalPage } from './comments-modal.page';

describe('CommentsModalPage', () => {
  let component: CommentsModalPage;
  let fixture: ComponentFixture<CommentsModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
