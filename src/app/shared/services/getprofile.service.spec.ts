import { TestBed } from '@angular/core/testing';

import { GetprofileService } from './getprofile.service';

describe('GetprofileService', () => {
  let service: GetprofileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetprofileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
