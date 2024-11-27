import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateproductPage } from './createproduct.page';

describe('CreateproductPage', () => {
  let component: CreateproductPage;
  let fixture: ComponentFixture<CreateproductPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateproductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
