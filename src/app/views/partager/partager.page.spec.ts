import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartagerPage } from './partager.page';

describe('PartagerPage', () => {
  let component: PartagerPage;
  let fixture: ComponentFixture<PartagerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PartagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
