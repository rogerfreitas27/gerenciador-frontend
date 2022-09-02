import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Pessoa } from 'src/app/model/pessoa';
import { Page } from 'src/app/model/page';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private readonly API = environment.API + 'api/pessoa/';


  httpOptions: Object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    responseType: 'text'
  };

  constructor(private http: HttpClient) { }


  save(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.API, pessoa, this.httpOptions);

  }



  findAll(page: number): Observable<Page> {
    console.log("page" + page);
    return this.http.get<Page>(this.API + '?page=' + page);
  }


  findByPessoa(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(this.API + id);

  }


  update(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(this.API, pessoa, this.httpOptions);
  }

  /*  Relatório de pessoas    */

  gerarRelatorioPessoas() {
    return this.http.get(this.API + 'relatorio/relatorioPessoa/', { responseType: 'text' });
  }


  gerarRelatorioEnderecosPessoa(id: number) {
    return this.http.get(this.API + 'relatorio/relatorioEnderecoPessoa/' + id, { responseType: 'text' });

  }

}















































































































































































































































