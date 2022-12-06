import { TestBed } from '@angular/core/testing';

import { CheckpassGuard } from './checkpass.guard';

describe('CheckpassGuard', () => {
  let guard: CheckpassGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckpassGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
