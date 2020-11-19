import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTrabajadoresComponent } from './ver-trabajadores.component';

describe('VerTrabajadoresComponent', () => {
  let component: VerTrabajadoresComponent;
  let fixture: ComponentFixture<VerTrabajadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerTrabajadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTrabajadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
