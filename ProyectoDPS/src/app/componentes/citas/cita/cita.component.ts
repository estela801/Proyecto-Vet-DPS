import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

//  Service
import { CitaService } from '../../../services/cita.service';
// Class
import { Cita } from '../../../models/cita';
// toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {

  citaList: Cita[];
  constructor(
    public citaService: CitaService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.citaService.getCitas()
    this.resetForm()
  }

  onSubmit(citaForm: NgForm) {
      
        this.citaService.insertCita(citaForm.value);
        this.resetForm(citaForm);
      this.toastr.success('Opreación exitosa', 'Control registrado');
      //else
        //this.citaService.updateCita(citaForm.value );
  }

  resetForm(citaForm?: NgForm) {
    if (citaForm != null)
      citaForm.reset();
    this.citaService.selectedCita = new Cita();
  }
}
  
