import { TestBed } from '@angular/core/testing';

import { UsuariovetService } from './usuariovet.service';

describe('UsuariovetService', () => {
  let service: UsuariovetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariovetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
