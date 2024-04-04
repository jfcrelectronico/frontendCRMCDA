import { Component, EventEmitter, Output} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Cliente } from '../interfaces/interfaces';
import { ClienteModel } from '../../models/cliente.model';
import { RouterLink } from '@angular/router';
import { ClientesService } from '../../services/clientes/clientes.service';
import { SignaturePadComponent } from "../../componentes/shared/signature-pad/signature-pad.component";
import { PdfComponent } from '../../componentes/pdf/pdf.component';
import { NgxPaginationModule } from 'ngx-pagination';



@Component({
    selector: 'app-ingresarclientes',
    standalone: true,
    templateUrl: './ingresarclientes.component.html',
    styleUrl: './ingresarclientes.component.css',
    imports: [ReactiveFormsModule, RouterLink, SignaturePadComponent,PdfComponent]
})

export class IngresarclientesComponent {
  
  crearPdf: boolean = false;
  clienteCreado : ClienteModel;
  firma : string ;

  //model agregarclientes sent information to model verclientes
  // then use @output() nombredeseadofuncion : EventEmitter<tipodatoaregresar> = new EventEmitter <tipodatoaregresar>();
  @Output() infoclientenuevo: EventEmitter<Cliente> =
    new EventEmitter<Cliente>();

  //rules for form agregarclientes
  clienteForm = new FormGroup({
    //id: new FormControl('',Validators.required),//lo trae mongo
    nombre: new FormControl('', Validators.required),
    direccion: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    TipoDocumento: new FormControl('', [Validators.required]),
    NumeroDocumento: new FormControl('', [Validators.required]),
    PlacaVehiculo: new FormControl('', [Validators.required]),
    TipoVehiculo: new FormControl('', [Validators.required]),
    Observaciones: new FormControl(''),
  });

  constructor(private clienteService: ClientesService) {}

 

  // create function that will call modal agregarcliente when push button Guardar
  crearcliente() {
    //for sent information use emit method, this method is part of output funcion create before
    //how infoclientenuevo is of type interface cliente this have differents attributes stablish for interface
    // then assigned attribuit for name and type for example
    // name attribut is id
    // type of this Number
    // value for this element
    //this.clienteForm.value.id -> value inside of form in the space id of clienteForm
    //developt in file agregarclientes.html

    const clienteNuevo = this.clienteForm.value;


    if (this.clienteForm.valid) {
      const data: ClienteModel = {
        nombre: clienteNuevo.nombre || '',
        direccion: clienteNuevo.direccion || '',
        telefono: clienteNuevo.telefono || '',
        email: clienteNuevo.email || '',
        TipoDocumento: clienteNuevo.TipoDocumento || '',
        NumeroDocumento: clienteNuevo.NumeroDocumento || '',
        PlacaVehiculo: clienteNuevo.PlacaVehiculo || '',
        TipoVehiculo: clienteNuevo.TipoVehiculo || '',
        Observaciones: clienteNuevo.Observaciones || '',
      };

      this.clienteService.crearCliente(data).subscribe({
        next: (resp: any) => {
          this.clienteCreado= resp.cliente;
          this.crearPdf= true;
        },
        error: (error: any) => {
          console.log('Error al crear el cliente');
        },
      });
    }

    //after push button and sent this clear form
    this.clienteForm.reset();
  }

  datafirma(firma: any)
  {
    this.firma= firma;
  }
}



