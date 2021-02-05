import { TestBed } from '@angular/core/testing';

import { GattiService } from './gatti.service';

describe('GattiService', () => {
  let service: GattiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GattiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
