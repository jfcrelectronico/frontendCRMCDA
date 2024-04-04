import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-signature-pad',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './signature-pad.component.html',
  styleUrl: './signature-pad.component.css'
})
export class SignaturePadComponent implements OnInit{
  
  signatureNeeded !: boolean;
  signaturePad !:SignaturePad;
  @ViewChild('canvas') canvasEl!: ElementRef;
  @Output() firma :EventEmitter<string>=new EventEmitter<string>();
  imagenFirmaCliente! : string;
  constructor(){}
  
  ngOnInit(): void {

  }

 
  ngAfterViewInit()
  {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  startDrawing(event:Event){

  }
  moved(event:Event){

  }
  clearPad()
  {
    this.signaturePad.clear();
  }

  savePad()
  {
    //const base64Data = this.signaturePad.toDataURL();    
    //this.imagenFirmaCliente = this.signaturePad.toDataURL(); 
    this.firma.emit(this.signaturePad.toDataURL());
    //console.log(this.signatureImg);
    this.signatureNeeded = this.signaturePad.isEmpty();
    if(!this.signatureNeeded){
      this.signatureNeeded=false;
    }

  }

/*   visual()
  {
    const ctx = .getContext("2d");
    const img = document.getElementById("fondo_rayar");
    ctx.drawImage(img,10,10,150,180);

  } */


 

}
