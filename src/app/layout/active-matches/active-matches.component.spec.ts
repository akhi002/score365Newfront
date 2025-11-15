import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveMatchesComponent } from './active-matches.component';

describe('ActiveMatchesComponent', () => {
  let component: ActiveMatchesComponent;
  let fixture: ComponentFixture<ActiveMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveMatchesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
