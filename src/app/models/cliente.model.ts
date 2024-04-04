export class ClienteModel
{

    constructor(

        //public readonly _id : number,
        public nombre: string ,
        public direccion: string,
        public telefono: string,
        public email: string,
        public TipoDocumento: string,
        public NumeroDocumento: string,
        public PlacaVehiculo: string,
        public TipoVehiculo : string,
        public createdAt?:Date,
        public updateAt?: Date,
        public Observaciones? : string,// observaciones no es requerido por eso tiene ?
    ){}
}

