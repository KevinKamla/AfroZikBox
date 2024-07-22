import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatesoundPage } from './createsound.page';

describe('CreatesoundPage', () => {
  let component: CreatesoundPage;
  let fixture: ComponentFixture<CreatesoundPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatesoundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
