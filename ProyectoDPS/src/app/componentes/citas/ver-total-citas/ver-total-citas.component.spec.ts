import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTotalCitasComponent } from './ver-total-citas.component';

describe('VerTotalCitasComponent', () => {
  let component: VerTotalCitasComponent;
  let fixture: ComponentFixture<VerTotalCitasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerTotalCitasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTotalCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
