import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacionCorreoComponent } from './verificacion-correo.component';

describe('VerificacionCorreoComponent', () => {
  let component: VerificacionCorreoComponent;
  let fixture: ComponentFixture<VerificacionCorreoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificacionCorreoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificacionCorreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
