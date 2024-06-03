import { TestBed } from '@angular/core/testing';

import { WaqiService } from './waqi.service';

describe('WaqiService', () => {
  let service: WaqiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaqiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
