import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatutPage } from './statut.page';

describe('StatutPage', () => {
  let component: StatutPage;
  let fixture: ComponentFixture<StatutPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StatutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
