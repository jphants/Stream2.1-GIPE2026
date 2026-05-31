import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlaQuery } from './ala-query';

describe('AlaQuery', () => {
  let component: AlaQuery;
  let fixture: ComponentFixture<AlaQuery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlaQuery],
    }).compileComponents();

    fixture = TestBed.createComponent(AlaQuery);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
