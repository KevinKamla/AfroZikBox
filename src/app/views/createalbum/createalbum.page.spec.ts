import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatealbumPage } from './createalbum.page';

describe('CreatealbumPage', () => {
  let component: CreatealbumPage;
  let fixture: ComponentFixture<CreatealbumPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatealbumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
