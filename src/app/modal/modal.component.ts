import { Component, OnInit,Input } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
@Input()
mensagem! : string;

@Input()
tipo! : string;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }
  
  onClose(){
  this.bsModalRef.hide();
  }
  
  mensagemSucesso(mensagem:string){
  
  }
  
  
  
  mensagemFalha(mensagem:string){
  
  }

}
