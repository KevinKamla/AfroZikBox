import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatepubPage } from './createpub.page';

describe('CreatepubPage', () => {
  let component: CreatepubPage;
  let fixture: ComponentFixture<CreatepubPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatepubPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
