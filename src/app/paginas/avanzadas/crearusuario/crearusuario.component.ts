import { Component, EventEmitter, Output } from '@angular/core';
import { config } from '../../../../environments/configuracion/config';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioModel } from '../../../models/usuario.model';
import { Usuario } from '../../interfaces/interfaces';
import { ActivatedRoute, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crearusuario',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './crearusuario.component.html',
  styleUrl: './crearusuario.component.css'
})
export class CrearusuarioComponent {
  roles = config.roles;
  usuarioSeleccionado : UsuarioModel;



  
  //model crearusuario sent information to model verusuario
  // then use @output() nombredeseadofuncion : EventEmitter<tipodatoaregresar> = new EventEmitter <tipodatoaregresar>();
  @Output() infousuarionuevo: EventEmitter<Usuario> =
    new EventEmitter<Usuario>();

  //rules for form crearusuario
  UsuarioForm = new FormGroup({
    //id: new FormControl('',Validators.required),//lo trae mongo
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    tipoDocumento: new FormControl('', [Validators.required]),
    numeroDocumento: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rol: new FormControl('', [Validators.required]),
    //estado: new FormControl('', [Validators.required]),
   
  });




  constructor(
    private usuarioService: UsuariosService,
    private activateRoute: ActivatedRoute
    
    
    ) {}

    ngOnInit():void{
      this.activateRoute.params.subscribe(({id})=>{
        this.buscarUsuario(id);
      });

    }

 

  // create function that will call modal agregarcliente when push button Guardar
  crearusuario() {

    if(this.usuarioSeleccionado)
    {
      this.actualizarDatosUsuario();
    }
    else
    {
      //for sent information use emit method, this method is part of output funcion create before
    //how infoclientenuevo is of type interface cliente this have differents attributes stablish for interface
    // then assigned attribuit for name and type for example
    // name attribut is id
    // type of this Number
    // value for this element
    //this.clienteForm.value.id -> value inside of form in the space id of clienteForm
    //developt in file agregarclientes.html

    const usuarioNuevo = this.UsuarioForm.value;

    if (this.UsuarioForm.valid) {
      const data: Usuario = {
        nombre: usuarioNuevo.nombre || '',
        email: usuarioNuevo.email || '',
        tipoDocumento: usuarioNuevo.tipoDocumento || '',
        numeroDocumento: usuarioNuevo.numeroDocumento || '',
        login: usuarioNuevo.login || '',
        password: usuarioNuevo.password || '',
        rol: usuarioNuevo.rol|| '',
        //estado: usuarioNuevo.estado ,
      };
      console.log("control 2");
      this.usuarioService.crearUsuario(data).subscribe({
        next: (resp: any) => {
          Swal.fire(
            'Creado',
            `Usuario creado con exito`,
            'success'
            );
        },
        error: (error: any) => {
          Swal.fire(
            'Error al crear Usuario',
            `El usuario no pudo ser creado`,
            'error'
            );
        },
      });
    }

    //after push button and sent this clear form
    this.UsuarioForm.reset();



    }
    
  }

  get dataformulario()
  {
    return this.UsuarioForm.controls;
  }

  actualizarDatosUsuario() {

    

    const dataActualizada: UsuarioModel ={
      ...this.UsuarioForm.value,
      _id: this.usuarioSeleccionado._id,
      nombre: this.UsuarioForm.value.nombre || '',
      email: this.UsuarioForm.value.email || '',
      tipoDocumento: this.UsuarioForm.value.tipoDocumento || '',
      numeroDocumento: this.UsuarioForm.value.numeroDocumento || '',
      login: this.UsuarioForm.value.login || '',
      password: this.usuarioSeleccionado.password,
      rol: this.UsuarioForm.value.rol || '',
      createdAt: this.usuarioSeleccionado.createdAt,
    };

    /* const usuarioSinPassword: UsuarioModel = { ...this.usuarioSeleccionado };
    delete usuarioSinPassword.password;  */

    this.usuarioService.actualizarUsuario(dataActualizada).subscribe({
      next: (resp: any) => {
        Swal.fire(
          'Usuario Actualizado',
          `El usuario se actualizó satisfactoriamente`,
          'success'
        );
      },
      error: (error: any) => {
        const errors = error?.error?.errors;
        const errorList: string[] = [];

        if (errors) {
          Object.entries(errors).forEach(([key, value]: [string, any]) => {
            if (value && value['msg']) {
              errorList.push('* ' + value['msg'] + '<br>');
            }
          });
        }

        Swal.fire({
          title: 'Error al actualizar el usuario',
          icon: 'error',
          html: `${errorList.length ? errorList.join('') : error.error.msg}`,
        });
      },
    });
    this.UsuarioForm.reset();
  }

  buscarUsuario(id: string) {
    if (id !== 'nuevo') {
      this.usuarioService.getUnsuario(id).subscribe({
        next: (resp: any) => {

          const {
            nombre,
            email,
            tipoDocumento,
            numeroDocumento,
            login,
            password,
            rol,
          } = resp.usuarioencontrado;

          this.usuarioSeleccionado = resp.usuarioencontrado;

          this.UsuarioForm.setValue({
            nombre: nombre,
            email: email,
            tipoDocumento: tipoDocumento,
            numeroDocumento: numeroDocumento,
            login: login,
            password: '',
            rol: rol,
          });
        },
        error: (error: any) => {
          const errors = error?.error?.errors;
          const errorList: string[] = [];

          if (errors) {
            Object.entries(errors).forEach(([key, value]: [string, any]) => {
              if (value && value['msg']) {
                errorList.push('* ' + value['msg'] + '<br>');
              }
            });
          }

          Swal.fire({
            title: 'Error al buscar el usuario',
            icon: 'error',
            html: `${errorList.length ? errorList.join('') : error.error.msg}`,
          });
        },
      });
    }
  }

}