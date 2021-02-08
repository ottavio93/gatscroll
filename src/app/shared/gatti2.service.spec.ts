import { TestBed } from '@angular/core/testing';

import { Gatti2Service } from './gatti2.service';

describe('Gatti2Service', () => {
  let service: Gatti2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Gatti2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
