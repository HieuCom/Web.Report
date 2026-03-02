import { TestBed } from '@angular/core/testing';

import { ColuminfoService } from './columinfo.service';

describe('ColuminfoService', () => {
  let service: ColuminfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColuminfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
