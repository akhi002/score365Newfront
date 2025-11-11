import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSports } from './all-sports';

describe('AllSports', () => {
  let component: AllSports;
  let fixture: ComponentFixture<AllSports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllSports]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSports);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
