import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VirementPage } from './virement.page';

describe('VirementPage', () => {
  let component: VirementPage;
  let fixture: ComponentFixture<VirementPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VirementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
