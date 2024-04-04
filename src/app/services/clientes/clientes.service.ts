

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ClienteModel } from '../../models/cliente.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  // se inyecta dependecia dentro del constructos httpClient
  constructor(private httpClient: HttpClient) { }

  get token():string{
    return localStorage.getItem('token')|| '';
  }

  get headers(){
    return {
      headers:{
        'x-token': this.token,

      },
    };
  }


  getClientes(){
    return this.httpClient.get(`${base_url}/cliente`,this.headers);
  }

  crearCliente(cliente: ClienteModel){
    return this.httpClient.post(`${base_url}/cliente`,cliente,this.headers);
  }
}
