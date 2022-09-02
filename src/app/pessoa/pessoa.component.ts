import { Component, OnInit } from '@angular/core';
import { PessoaService } from 'src/app/service/pessoa.service';
import { Page } from 'src/app/model/page';
import { Pessoa } from 'src/app/model/pessoa';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderInterceptorService } from 'src/app/service/interceptor.service';



@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {

  pessoas: Array<Pessoa> = [];
  pag!: Page;
  page = 0;
  count = 0;
  pageSize = 0;
  totalPages = 0;
  title: string = "";
  responsiveP: boolean = true;
  spinner: boolean = true;
  spinnerRelatorio: boolean = true;
  closeResult!: string;
  constructor(private pessoaService: PessoaService,
    private modalService: NgbModal,
    private noticacaoService: HeaderInterceptorService) { }

  ngOnInit(): void {
    this.carregarPessoas(this.page);
  }



  carregarPessoas(page: number) {
    this.pessoaService.findAll(page).subscribe(res => {
      this.pag = res;
      console.log("page content" + this.pag.totalElements);
      this.count = this.pag.totalElements;
      this.pessoas = this.pag.content;
      this.totalPages = this.pag.totalPages;
      this.spinner = false;


    },
      (error: any) => {
        this.spinner = false;
        this.noticacaoService.enviaRespostaParaTelaPeloModal("danger", error);
        console.log(error);

      });

  }




  loadMore(pagina: number) {

    this.carregarPessoas(pagina - 1);

  }




  excluirPessoa(id: any) {

    if (confirm('Deseja realmente excluir esta pessoa ?')) {



      alert("Funcionalidade será implementada em versões futuras");
    }
  }



  gerarRelatorioPessoas(content: any) {
    this.modalService.open(content, { size: 'xl' });
    this.pessoaService.gerarRelatorioPessoas().subscribe(res => {
      document.querySelector('iframe')!.src = res;
      this.spinnerRelatorio = false;

    },
      (error: any) => {
        this.spinnerRelatorio = false;
        this.noticacaoService.enviaRespostaParaTelaPeloModal("danger", error);

      });

  }

}
