/* https://github.com/michaelbromley/ngx-pagination/blob/master/README.md#demo */
/* https://material.angular.io/ */

import { Component, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Cliente } from '../interfaces/interfaces';
import { IngresarclientesComponent } from '../ingresarclientes/ingresarclientes.component';
import { ClientesService } from '../../services/clientes/clientes.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-verclientes',
  standalone: true,
  templateUrl: './verclientes.component.html',
  styleUrl: './verclientes.component.css',
  imports: [RouterLink, IngresarclientesComponent,NgxPaginationModule],
})
export class VerclientesComponent implements OnInit {
  p: number = 1;
  misclientesForm: Cliente[] = [];

  mostrar: boolean = false;

  constructor(private clienteService: ClientesService, private router: Router) {}

  ngOnInit(): void {
    //SUSCRIPCION DE DATOS CADA VEZ QUE EXISTA UN CAMBIO ESTE COMPONENTE SE VA A ACTUALIZAR
    this.clienteService.getClientes().subscribe((data: any) => {
      this.misclientesForm = data.clientes;
    });
  }
  //create method eliminarCliente

  eliminarCliente(idCliente: number): void {
    //filer cliente id//variable deseada is of type Cliente
    //filter all elements of misclients with idcliente different to idcliente and then
    //assigned these to misclientes
    this.misclientesForm = this.misclientesForm.filter(
      (variabledeseada) => variabledeseada._id !== idCliente
    );
  }

  //this function is call when generate and $event in the funcion @output define on agregarclientes.component.ts

  actualizarcliente(cliente: Cliente): void {
    // the informacion receive for since function @output infoclientenuevo define on agregarclientes.component.ts
    //is of type interface cliente, with this information put this inside of form misclientesForm
    //using methoid push
    this.misclientesForm.push(cliente);
  }

  editarcliente(idclient: Number): void {
    //this.misclientes.push(clienteform());
  }

  showagregarclientes() {
    this.mostrar = true;
  }

  agregarCliente() {
    this.router.navigateByUrl('./../ingresarclientes');
  }
}
