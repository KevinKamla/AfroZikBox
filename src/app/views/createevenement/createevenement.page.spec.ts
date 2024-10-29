import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateevenementPage } from './createevenement.page';

describe('CreateevenementPage', () => {
  let component: CreateevenementPage;
  let fixture: ComponentFixture<CreateevenementPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateevenementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
