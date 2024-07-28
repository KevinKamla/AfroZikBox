import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetraitsPage } from './retraits.page';

describe('RetraitsPage', () => {
  let component: RetraitsPage;
  let fixture: ComponentFixture<RetraitsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RetraitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
