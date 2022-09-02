import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PessoaComponent } from './pessoa/pessoa.component';
import { FormPessoaComponent } from './pessoa/form-pessoa/form-pessoa.component';
import { EnderecoComponent } from './endereco/endereco.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Erro404Component } from './erro404/erro404.component';
import { MenuComponent } from './menu/menu.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import {ModalModule} from 'ngx-bootstrap/modal'; 
import { PessoaService } from './service/pessoa.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { HttpInterceptorModule } from './service/interceptor.service';
import { HeaderInterceptorService } from './service/interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    PessoaComponent,
    FormPessoaComponent,
    EnderecoComponent,
    Erro404Component,
    MenuComponent,
    SpinnerComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
	ReactiveFormsModule,
	HttpClientModule,
	NgxPaginationModule,
	HttpInterceptorModule,
 BrowserAnimationsModule,
 ModalModule.forRoot()
  ],
  entryComponents:[ModalComponent],
  providers: [PessoaService,HttpClientModule,HeaderInterceptorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
