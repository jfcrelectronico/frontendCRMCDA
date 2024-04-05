/* 

https://www.nodemailer.com/

https://www.npmjs.com/package/jspdf

*/

import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,

} from '@angular/core';

import { ClienteModel } from '../../models/cliente.model';
import jsPDF from 'jspdf';
import { SignaturePadComponent } from "../shared/signature-pad/signature-pad.component";
import { __values } from 'tslib';

@Component({
    selector: 'app-pdf',
    standalone: true,
    templateUrl: './pdf.component.html',
    styleUrls: ['./pdf.component.css'],
    imports: [SignaturePadComponent]
})
export class PdfComponent implements OnChanges {
  @Input() crearPdf: boolean = false;
  @Input() clienteCreado: ClienteModel;
  @Input() firmaCliente:string;

  //this.clienteCreado.nombre

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['crearPdf'].currentValue) {
      this.downloadPDF();
    }
  }

  downloadPDF() 
  {

    const doc = new jsPDF(

  {
    orientation: 'l',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts:true
  }
 
 
    );
   
   
    doc.rect(20, 0,50,30); // empty square
    doc.addImage({
      x: 35,
      y: 5,
      width: 20,
      height: 20,
      imageData:"./assets/imagenes/icono2.png"})
    doc.rect(70, 0,150,30); // empty square
    doc.setFontSize(22);
    doc.text("RECEPCION DE VEHICULOS \n           Y MOTOCICLETAS",90,15,{align:'left'});

    doc.rect(220, 0,50,10); // empty square
    doc.setFontSize(16);
    doc.text("Codigo: IOT-01",242,6,{align:'center'});
    doc.rect(220, 10,50,10); // empty square
    doc.setFontSize(16);
    doc.text("Version:1",236,16,{align:'center'});
    doc.rect(220, 20,50,10); // empty square
    doc.setFontSize(14);
    //console.log(Date());
    doc.text("Fecha: " + Date().substring(4,15),244,26,{align:'center'});

    doc.setFontSize(14);
    doc.text("Nombre",20,60,{align:'left'});
    doc.rect(20, 62,90,10); // empty square
    //doc.text(this.clienteCreado.nombre,29,68,{align:'center'});
    doc.text(this.clienteCreado.nombre,29,68);

    doc.setFontSize(14);
    doc.text("Telefono",120,60,{align:'left'});
    doc.rect(120, 62,40,10); // empty square
    doc.text(this.clienteCreado.telefono,133,68,{align:'center'});

    doc.setFontSize(14);
    doc.text("Tipo Documento",165,60,{align:'left'});
    doc.rect(185, 62,10,10); // empty square
    doc.text(this.clienteCreado.TipoDocumento,189,68,{align:'center'});

    doc.setFontSize(14);
    doc.text("Numero Documento",210,60,{align:'left'});
    doc.rect(210, 62,60,10); // empty square
    doc.text(this.clienteCreado.NumeroDocumento,225,68,{align:'center'});
    
    
    doc.setFontSize(14);
    doc.text("Direccion: ",20,90,{align:'left'});
    doc.rect(20, 92,120,10); // empty square
    doc.text(this.clienteCreado.direccion,30,98,{align:'center'});

    doc.setFontSize(14);
    doc.text("Correo Electronico: ",150,90,{align:'left'});
    doc.rect(150, 92,120,10); // empty square
    doc.text(this.clienteCreado.email,171,98,{align:'center'});

    doc.setFontSize(14);
    doc.text("Tipo de vehiculo: ",20,120,{align:'left'});
    doc.rect(20, 122,50,10); // empty square
    doc.text(this.clienteCreado.TipoVehiculo,30,128,{align:'center'});

    doc.setFontSize(14);
    doc.text("Placa del vehiculo: ",150,120,{align:'left'});
    doc.rect(150, 122,80,40); // empty square
    doc.setFontSize(42);
    doc.text(this.clienteCreado.PlacaVehiculo.toUpperCase(),183,148,{align:'center'});

    doc.addPage();

     doc.rect(20, 0,50,30); // empty square
    doc.addImage({
      x: 35,
      y: 5,
      width: 20,
      height: 20,
      imageData:"./assets/imagenes/icono2.png"})
    doc.rect(70, 0,150,30); // empty square
    doc.setFontSize(22);
    doc.text("RECEPCION DE VEHICULOS \n           Y MOTOCICLETAS",90,15,{align:'left'});

    doc.rect(220, 0,50,10); // empty square
    doc.setFontSize(16);
    doc.text("Codigo: IOT-01",242,6,{align:'center'});
    doc.rect(220, 10,50,10); // empty square
    doc.setFontSize(16);
    doc.text("Version:1",236,16,{align:'center'});
    doc.rect(220, 20,50,10); // empty square
    doc.setFontSize(14);
    //console.log(Date());
    doc.text("Fecha: " + Date().substring(4,15),244,26,{align:'center'});

    var splitobservaciones = doc.splitTextToSize(this.clienteCreado.Observaciones || "", 230);
    

    doc.setFontSize(14);
    doc.text("Observaciones",20,60,{align:'left'});
    doc.rect(20, 62,250,100); // empty square
    doc.text(splitobservaciones,25,68);


     doc.addPage();

     doc.rect(20, 0,50,30); // empty square
    doc.addImage({
      x: 35,
      y: 5,
      width: 20,
      height: 20,
      imageData:"./assets/imagenes/icono2.png"})
    doc.rect(70, 0,150,30); // empty square
    doc.setFontSize(22);
    doc.text("RECEPCION DE VEHICULOS \n           Y MOTOCICLETAS",90,15,{align:'left'});

    doc.rect(220, 0,50,10); // empty square
    doc.setFontSize(16);
    doc.text("Codigo: IOT-01",242,6,{align:'center'});
    doc.rect(220, 10,50,10); // empty square
    doc.setFontSize(16);
    doc.text("Version:1",236,16,{align:'center'});
    doc.rect(220, 20,50,10); // empty square
    doc.setFontSize(14);
    //console.log(Date());
    doc.text("Fecha: " + Date().substring(4,15),244,26,{align:'center'});

    doc.setFontSize(18);
    doc.text("CONDICIONES PARA LA PRESTACION DEL SERVICIO",20,60,{align:'left'});
   

    const condiciones = "El CDA IOTHIX Solutions , en adelante CDA,enumera las condiciones de prestacion de sus servicios: \n1) Es obligatoria de presencia fisica del vehiculo en el CDA incluyendo las licencia de transisto.\n2)El tiempo estimado de la prueba es de 40 minutos una vez el vehiculo a ingresado a la pista de revisión,teniendo en cuenta que pueden haber mas vehiculos en espera,por lo que el tiempo mencionado puede ser mayor.\n3)Al realizar la revisión, su vehículo sera sometido al grado de exigenic estipulado por las normas tecnicas viegentes, por lo tanto el CDA no se hace responsable por los daños generados en el procedimiento ni realizara ningun ajuste o arreglo del vehiculo"

    var splitcondiciones = doc.splitTextToSize(condiciones, 320);   

    doc.setFontSize(14);
    doc.text(splitcondiciones,20,70);


    doc.setFontSize(14);
    doc.text("Firma",180,140,{align:'left'});
    doc.rect(180, 150,80,40); // empty square
    
    doc.addImage({
      x: 185,
      y: 152,
      width: 50,
      height: 30,      
      imageData : this.firmaCliente})
      


    // Guardar el documento PDF
    doc.save('documento.pdf');
   


    
  }

  
   

  }


 
