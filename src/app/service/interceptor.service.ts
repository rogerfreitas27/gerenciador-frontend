import { Injectable, NgModule } from '@angular/core';
import { HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalComponent } from 'src/app/modal/modal.component';


@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {
  bsModalRef?: BsModalRef;

  intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {

    console.log(req);
    return next.handle(req).pipe(

      tap((event: HttpEvent<any>) => {

        if (event instanceof HttpResponse && (event.status === 201)) {
          this.enviaRespostaParaTelaPeloModal('success', 'Cadastro realizado com sucesso');
        }
      })

      , catchError(this.processaError)) as Observable<HttpEvent<any>>;




  }

  constructor(private modalService: BsModalService) { }


  processaError(error: HttpErrorResponse) {
    let errorMessage = 'Erro desconhecido';
    if (error.error instanceof ErrorEvent) {
      console.error(error.error);
      errorMessage = 'Error: ' + error.error.error;

    } else {
      errorMessage = `Código do erro: ${error.status}, ` + `mensagem: ${error.error}`;

    }


    return throwError(errorMessage);

  }


  enviaRespostaParaTelaPeloModal(tipo: string, mensagem: string) {
    this.bsModalRef = this.modalService.show(ModalComponent);
    this.bsModalRef.content.mensagem = mensagem;
    this.bsModalRef.content.tipo = tipo;
  }





}

@NgModule({
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptorService,
    multi: true,
  },
  ],
})

export class HttpInterceptorModule {

}
