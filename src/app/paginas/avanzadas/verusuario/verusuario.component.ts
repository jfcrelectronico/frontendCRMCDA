import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { Subscription } from 'rxjs';
import { UsuarioModel } from '../../../models/usuario.model';
import Swal from 'sweetalert2';
import { AutenticacionService } from '../../../services/autenticacion/autenticacion.service';
import { config } from '../../../../environments/configuracion/config';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../interfaces/interfaces';
import { Router, RouterLink } from '@angular/router';
import { ROUTER_APP } from '../../../enum/router.app.enum';


@Component({
  selector: 'app-verusuario',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './verusuario.component.html',
  styleUrl: './verusuario.component.css'
})
export class VerusuarioComponent implements OnInit,OnDestroy{
 
  usuarioSubscription: Subscription;
  usuarios: UsuarioModel[] = [];//variable del tipo UsuarioModel
  usuarioLogin : UsuarioModel;
  roles = config.roles;

  misusuariosForm: Usuario[] = [];
  
  constructor
  (
    private usuarioService: UsuariosService, 
    private autenticacionService: AutenticacionService,
    private router : Router
  ){}
 
 
  
  ngOnInit(): void {
    this.usuarioLogin = this.autenticacionService.usuario;
    this.cargarUsuarios();
  }

  ngOnDestroy(): void {
    this.usuarioSubscription?.unsubscribe();
  }

  cargarUsuarios(){
    this.usuarioSubscription = this.usuarioService.getUsuarios().subscribe((resp: any)=>{
      this.usuarios= resp.usuarios;
    })

  }

  eliminarUsuario(usuario:UsuarioModel)
  {

    if(usuario._id === this.usuarioLogin._id)
    {
      Swal.fire('Error!','NO se puede eliminar este usuario','error');

    }
    else
    {
      
     this.usuarioService.eliminarUsuario(usuario._id).subscribe((resp: any)=>{
        Swal.fire(
          'Eliminado',
          `Elimino usuario`,
          'success'
          );
        this.cargarUsuarios();//recargar usuarios
        
      }); 
      this.cargarUsuarios();//recargar usuarios

    }
    
  }

  actualizarRol(usuario:UsuarioModel){
    this.usuarioService.actualizarUsuario(usuario).subscribe((resp: any)=>{

       Swal.fire(
         'Actualizado',
         `Se actualizoel usuario ${resp.usuario.nombre}`,
         'success'
         );
     });
  }

  editarUsuarios(id: string){
    this.router.navigateByUrl(`${ROUTER_APP.CREARUSUARIOS}/${id}`);
  }

}
