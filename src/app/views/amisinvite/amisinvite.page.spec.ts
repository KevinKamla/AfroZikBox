import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmisinvitePage } from './amisinvite.page';

describe('AmisinvitePage', () => {
  let component: AmisinvitePage;
  let fixture: ComponentFixture<AmisinvitePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AmisinvitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
