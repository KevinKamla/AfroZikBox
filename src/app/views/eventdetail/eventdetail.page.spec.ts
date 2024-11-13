import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventdetailPage } from './eventdetail.page';

describe('EventdetailPage', () => {
  let component: EventdetailPage;
  let fixture: ComponentFixture<EventdetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EventdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
