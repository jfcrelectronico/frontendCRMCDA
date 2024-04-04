import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { VerclientesComponent } from './paginas/verclientes/verclientes.component';
import { IngresarclientesComponent } from './paginas/ingresarclientes/ingresarclientes.component';
import { authGuard } from './guards/auth/auth.guard';
import { VerusuarioComponent } from './paginas/avanzadas/verusuario/verusuario.component';
import { CrearusuarioComponent } from './paginas/avanzadas/crearusuario/crearusuario.component';

export const routes: Routes = [

    {//ruta padre
        path: 'inicio',
        title: 'Autenticacion',
        children:[
            {path: '',component:InicioComponent},
          
        ]

    },

    {
        path:'cda',
        title:'Inicio',
        canActivate: [authGuard],//se establece el bloqueo si el usuario aun no a hecho login

        children:[
            //path por defecto del padre
            //{path: '',title: 'Inicio', component:InicioComponent},
                    
            {
                path: 'verclientes',
                title: 'VerClientes',
                component: VerclientesComponent,
            },
        
            {
                path: 'ingresarclientes',
                title: 'IngresarCLientes',
                component: IngresarclientesComponent,
            },
        
           /*  {
                path: 'avanzadas',
                title: 'Avanzadas',
                component: AvanzadasComponent,
            }, */


            {
                path: 'crear-usuarios/:id',
                title: 'Agregar Usuarios',
                component: CrearusuarioComponent,
            },


            {
                path: 'ver-usuarios',
                title: 'Ver Usuarios',
                component: VerusuarioComponent,
            },

        ],


        


    },
    //si no encuentra la ruta, redicciona a esta ruta
        {path: '**',redirectTo:'inicio',pathMatch:'full'}

   /*  {
        path: '',
        title: 'Inicio',
        component: InicioComponent,
    },

    {
        path: 'verclientes',
        title: 'VerClientes',
        component: VerclientesComponent,
    },

    {
        path: 'ingresarclientes',
        title: 'IngresarCLientes',
        component: IngresarclientesComponent,
    },

    {
        path: 'avanzadas',
        title: 'Avanzadas',
        component: AvanzadasComponent,
    }, */


];
