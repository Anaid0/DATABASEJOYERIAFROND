import { TestBed } from '@angular/core/testing';

import { ServicesProductosService } from './services-productos.service';

describe('ServicesProductosService', () => {
  let service: ServicesProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
