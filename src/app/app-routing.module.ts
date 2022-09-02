import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaComponent } from './pessoa/pessoa.component';
import { FormPessoaComponent  } from './pessoa/form-pessoa/form-pessoa.component';
import { EnderecoComponent } from './endereco/endereco.component';
import { Erro404Component } from './erro404/erro404.component';


const routes: Routes = [
  { path: '',  component: PessoaComponent },
  { path: 'pessoa',  component: PessoaComponent },
  { path: 'form-pessoa',  component: FormPessoaComponent },
  { path: 'form-pessoa/:id',  component: FormPessoaComponent },
  { path: 'endereco/:id',  component: EnderecoComponent },
  { path: '**', component: Erro404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
