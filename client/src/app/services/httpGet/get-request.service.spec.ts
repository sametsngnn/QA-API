import { TestBed } from '@angular/core/testing';

import { GetRequestService } from './get-request.service';

describe('GetRequestService', () => {
  let service: GetRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
