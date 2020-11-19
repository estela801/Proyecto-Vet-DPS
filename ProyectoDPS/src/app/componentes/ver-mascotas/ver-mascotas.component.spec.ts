import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMascotasComponent } from './ver-mascotas.component';

describe('VerMascotasComponent', () => {
  let component: VerMascotasComponent;
  let fixture: ComponentFixture<VerMascotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerMascotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
