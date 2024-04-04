import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion/autenticacion.service';
import Swal from 'sweetalert2';
import { error } from 'console';
import { ROUTER_APP } from '../../enum/router.app.enum';
import { PermisosDirective } from '../../directives/permisos/permisos.directive';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule,PermisosDirective],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{

  loginform !: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private autenticacionService: AutenticacionService,
              private router : Router
              ){}

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      login : ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(4)]]
    });
  }
  get login()
  {
    return this.loginform.get('login')
  };
  get password()
  {
    return this.loginform.get('password')
  };


  realizoLogin(){
    if(this.loginform.invalid)
    {
      return;
    }
    const data = this.loginform.value;
    this.autenticacionService.login(data).subscribe({
      next : (resp: any)=>{
        if(resp && resp.usuario)
        {
          const {nombre, login, email} = resp.usuario;

          Swal.fire({
            html : `Bienvenido ${nombre}`,
          }).then(()=>{
            this.router.navigateByUrl(ROUTER_APP.INICIO);
          });
          this.loginform.reset();//LIMPIAR EL FORMULARIO
        }
      },
      error:(error: any )=>{
          console.log(error.error.msg);
      },
      
    });
  }

  autenticacionservice = inject(AutenticacionService);
  
  cerrarSesion(){
    this.autenticacionservice.logout()
   
  }

  //permite traer las variables definidas
  get ROUTER_APP()
  {
    return ROUTER_APP;
  }

}
 