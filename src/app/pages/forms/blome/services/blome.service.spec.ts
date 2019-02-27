import { TestBed } from '@angular/core/testing';

import { BlomeService } from './blome.service';

describe('BlomeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlomeService = TestBed.get(BlomeService);
    expect(service).toBeTruthy();
  });
});
