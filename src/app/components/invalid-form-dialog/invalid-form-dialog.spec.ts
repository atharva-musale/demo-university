import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidFormDialog } from './invalid-form-dialog';

describe('InvalidFormDialog', () => {
  let component: InvalidFormDialog;
  let fixture: ComponentFixture<InvalidFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvalidFormDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvalidFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
