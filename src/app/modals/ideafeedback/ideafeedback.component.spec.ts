import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeafeedbackComponent } from './ideafeedback.component';

describe('IdeafeedbackComponent', () => {
  let component: IdeafeedbackComponent;
  let fixture: ComponentFixture<IdeafeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdeafeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeafeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
