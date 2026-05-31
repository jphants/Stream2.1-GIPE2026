import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorQuery } from './sensor-query';

describe('SensorQuery', () => {
  let component: SensorQuery;
  let fixture: ComponentFixture<SensorQuery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorQuery],
    }).compileComponents();

    fixture = TestBed.createComponent(SensorQuery);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
