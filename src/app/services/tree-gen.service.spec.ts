import { TestBed } from '@angular/core/testing';

import { TreeGenService } from './tree-gen.service';

describe('TreeGenService', () => {
  let service: TreeGenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreeGenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
