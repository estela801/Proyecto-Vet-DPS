import { TestBed } from '@angular/core/testing';

import { UsuarioPHPService } from './usuario-php.service';

describe('UsuarioPHPService', () => {
  let service: UsuarioPHPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioPHPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
