import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInterfacesTs } from '../../interfaces/login-interfaces.ts';
import { environment } from '../../../environments/environment.js';
import { Observable, Subject, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UsuarioModel } from '../../models/usuario.model.js';



const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService
{
  private loginEvent = new Subject<void>();
  private logoutEvent = new Subject<void>();
  usuario: UsuarioModel ;

  constructor(private httpClient: HttpClient, private router: Router) {}

  private get headers()
  {
    return{
      headers:{
        'x-token-pass': localStorage.getItem('x-token-pass') || '',
      }

    };

  }

  get onLogin(): Subject<void>{
    return this.loginEvent;
  }

  get onLogout(): Subject<void>{
    return this.logoutEvent;
  }


  get token(): string{
    return localStorage.getItem('token') || '';
  }

  validateToken() : Observable<boolean>
  {
    return this.httpClient.get(`${base_url}/autenticacion`,{
      headers:{
        'x-token': this.token,
      },
    }).pipe(
      map((resp: any)=>{
        const{ 
           _id, 
          nombre,
          email,
          tipoDocumento,
          numeroDocumento,
          login,
          
          rol,
         /*  estado, */
          createdAt,
          password} = resp.usuario;
          console.log(resp);
          this.usuario = new UsuarioModel(
          _id,
          nombre,
          email,
          tipoDocumento,
          numeroDocumento,
          login,
          
          rol,
         /*  estado, */
          createdAt,
          password
          );
          localStorage.setItem('token',resp.token);
          return true;
      }),
      catchError((error)=>{
        console.error(error);
        return of(false);
      })
    );
  }

  login(login: LoginInterfacesTs)
  {
    return this.httpClient.post(`${base_url}/autenticacion`,login).pipe(
      tap((resp: any)=>{
          localStorage.setItem('token', resp.token);
          this.loginEvent.next();
          })      
    );
    
  }

  logout(){
    localStorage.removeItem('token');
    this.usuario.rol= '';//cuando hace logout cambio el rol para evitar que se dupliquen los botones
    this.logoutEvent.next();
    this.router.navigateByUrl('');

  }

  getUsuarioActual(): Observable<UsuarioModel | null>{
    return this.validateToken().pipe(
      map(()=>this.usuario)
    );
  }


}



