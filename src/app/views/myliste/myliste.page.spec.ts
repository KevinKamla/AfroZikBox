import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MylistePage } from './myliste.page';

describe('MylistePage', () => {
  let component: MylistePage;
  let fixture: ComponentFixture<MylistePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MylistePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
