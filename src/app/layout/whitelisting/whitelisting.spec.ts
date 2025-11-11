import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Whitelisting } from './whitelisting';

describe('Whitelisting', () => {
  let component: Whitelisting;
  let fixture: ComponentFixture<Whitelisting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Whitelisting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Whitelisting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
