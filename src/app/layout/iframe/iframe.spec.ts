import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Iframe } from './iframe';

describe('Iframe', () => {
  let component: Iframe;
  let fixture: ComponentFixture<Iframe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Iframe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Iframe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
