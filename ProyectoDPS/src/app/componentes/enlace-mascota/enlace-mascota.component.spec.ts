import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnlaceMascotaComponent } from './enlace-mascota.component';

describe('EnlaceMascotaComponent', () => {
  let component: EnlaceMascotaComponent;
  let fixture: ComponentFixture<EnlaceMascotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnlaceMascotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnlaceMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
