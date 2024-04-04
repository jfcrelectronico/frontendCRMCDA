export interface Cliente {

    _id : number;
    nombre: string ,
    direccion: string,
    telefono: string,
    email: string,
    TipoDocumento: string,
    NumeroDocumento: string,
    PlacaVehiculo: string,
    TipoVehiculo : string,
    Observaciones : string,
}


export interface Usuario {

 
    nombre: string ,
    email: string,
    tipoDocumento: string,
    numeroDocumento: string,
    login: string,
   
    rol : string,
    password : string,
   // estado: boolean,
}

