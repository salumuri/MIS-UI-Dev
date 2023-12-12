import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessImprovementsComponent } from './process-improvements.component';

describe('ProcessImprovementsComponent', () => {
  let component: ProcessImprovementsComponent;
  let fixture: ComponentFixture<ProcessImprovementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessImprovementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessImprovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
