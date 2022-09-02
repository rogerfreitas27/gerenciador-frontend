import { Injectable } from '@angular/core';
import { Endereco } from 'src/app/model/endereco';
import { EnderecoDto } from 'src/app/model/endereco-dto';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  private readonly API = environment.API + 'api/endereco/';


  httpOptions: Object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    responseType: 'text'
  };

  constructor(private http: HttpClient) { }



  save(enderecoDto: EnderecoDto): Observable<EnderecoDto> {
    return this.http.post<EnderecoDto>(this.API, enderecoDto, this.httpOptions);

  }


  findEnderecoByPessoa(idPessoa: number): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(this.API + idPessoa)
      .pipe(
        retry(2));

  }

  updateEnderecoPrincipal(idEndereco: number): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(this.API + 'update/' + idEndereco);

  }


}
