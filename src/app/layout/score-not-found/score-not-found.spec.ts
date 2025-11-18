import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreNotFound } from './score-not-found';

describe('ScoreNotFound', () => {
  let component: ScoreNotFound;
  let fixture: ComponentFixture<ScoreNotFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreNotFound]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreNotFound);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
