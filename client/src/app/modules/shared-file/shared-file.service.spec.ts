import { TestBed } from '@angular/core/testing';

import { SharedFileService } from './shared-file.service';

describe('SharedFileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedFileService = TestBed.get(SharedFileService);
    expect(service).toBeTruthy();
  });
});
