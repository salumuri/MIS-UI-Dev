import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InhouseToolDetailsComponent } from './inhouse-tool-details.component';

describe('InhouseToolDetailsComponent', () => {
  let component: InhouseToolDetailsComponent;
  let fixture: ComponentFixture<InhouseToolDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InhouseToolDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InhouseToolDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
