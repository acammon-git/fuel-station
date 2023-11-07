import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLinePageComponent } from './edit-line-page.component';

describe('EditLinePageComponent', () => {
  let component: EditLinePageComponent;
  let fixture: ComponentFixture<EditLinePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditLinePageComponent]
    });
    fixture = TestBed.createComponent(EditLinePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
