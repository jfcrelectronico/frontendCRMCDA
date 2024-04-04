import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../../models/usuario.model';
import { IUsuario } from '../../interfaces/IUsuarios';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

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

  getUsuarios(){
    return this.httpClient.get(`${base_url}/usuario`,this.headers);
  }

  crearUsuario(usuario: IUsuario){
    return this.httpClient.post(`${base_url}/usuario`,usuario,this.headers);
  }
  ///TODO completar las definiciones de mis servicios
  actualizarUsuario(usuario: UsuarioModel){
    return this.httpClient.put(`${base_url}/usuario/${usuario._id}`,usuario,this.headers);
  }

  eliminarUsuario(id: string){
    return this.httpClient.delete(`${base_url}/usuario/${id}`,this.headers);
  }

  /* actualizarUnUsuario(usuario: UsuarioModel){
    return this.httpClient.put(`${base_url}/usuario/${usuario._id}`,usuario,this.headers);
  } */

  getUnsuario(id: string){
    return this.httpClient.get(`${base_url}/usuario/${id}`,this.headers);
  }


}
  
