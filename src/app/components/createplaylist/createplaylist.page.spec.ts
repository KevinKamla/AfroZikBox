import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateplaylistPage } from './createplaylist.page';

describe('CreateplaylistPage', () => {
  let component: CreateplaylistPage;
  let fixture: ComponentFixture<CreateplaylistPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateplaylistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
