import { TestBed } from '@angular/core/testing';

import { PutRequestService } from './put-request.service';

describe('PutRequestService', () => {
  let service: PutRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PutRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
