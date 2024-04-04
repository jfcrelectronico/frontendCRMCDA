import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
/* import { provideClientHydration } from '@angular/platform-browser'; */
import { provideHttpClient } from '@angular/common/http';//para conexion con la API

export const appConfig: ApplicationConfig = {
 /*  providers: [provideRouter(routes), provideClientHydration()] */
 providers: [provideRouter(routes), provideHttpClient()] //para conexion con la API
 //ejecutar en una terminal ng g s services/clientes/clientes
};
