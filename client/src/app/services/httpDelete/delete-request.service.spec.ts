import { TestBed } from '@angular/core/testing';

import { DeleteRequestService } from './delete-request.service';

describe('DeleteRequestService', () => {
  let service: DeleteRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
