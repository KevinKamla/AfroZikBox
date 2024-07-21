import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateradiostationPage } from './createradiostation.page';

describe('CreateradiostationPage', () => {
  let component: CreateradiostationPage;
  let fixture: ComponentFixture<CreateradiostationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateradiostationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
