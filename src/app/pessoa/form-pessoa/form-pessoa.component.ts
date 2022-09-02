import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { PessoaService } from 'src/app/service/pessoa.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderInterceptorService } from 'src/app/service/interceptor.service';
import { Pessoa } from 'src/app/model/pessoa';

@Component({
  selector: 'app-form-pessoa',
  templateUrl: './form-pessoa.component.html',
  styleUrls: ['./form-pessoa.component.css']
})
export class FormPessoaComponent implements OnInit {
  formPessoa!: FormGroup;
  titulo: string = "";
  idPessoa!: number;
  endereco_id!: number;
  formArray: FormArray = new FormArray([]);
  mensagem_erro: string = "";
  exibeBotaoPdf: boolean = false;
  spinner: boolean = false;
  spinnerRelatorio: boolean = true;

  constructor(private fb: FormBuilder, private pessoaService: PessoaService,
    private router: Router, private route: ActivatedRoute,
    private modalService: NgbModal,
    private noticacaoService: HeaderInterceptorService) { }

  ngOnInit(): void {
    this.verificaSeUrlTemParametro();
  }




  verificaSeUrlTemParametro() {



    this.carregarFormEndereco();

    this.route.params.subscribe(params => {

      if (params.id) {

        this.idPessoa = params.id;
        this.titulo = "Editar Pessoa";
        this.buscarPessoaPorId(this.idPessoa);

      }

      else
        this.titulo = "Cadastrar Pessoa";



    });



  }








  carregarFormEndereco() {
    this.formPessoa = this.fb.group({


      id: new FormControl('', []),
      nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      dataNascimento: new FormControl('', [Validators.required]),
      endereco: this.fb.array([this.criaEndereco()])


    });
  }



  criaEndereco(): FormGroup {

    return this.fb.group({
      idEndereco: [''],
      logradouro: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      numero: ['',],
      cidade: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      principal: ['', Validators.required]
    })




  }


  adicionaEndereco() {
    this.endereco.push(this.criaEndereco());
  }

  removerEndereco(i: number) {

    this.endereco.removeAt(i);
  }

  onSubmit() {
    var valor;
    valor = this.verificaSeTemMaisDeUmEnderecoPrincipal(this.formPessoa.value);
    if (valor == false) {
      return;
    }

    console.log(this.formPessoa.value);

    if (this.idPessoa == null) {


      var pessoa: Pessoa = {
        nome: this.formPessoa.value.nome,
        dataNascimento: this.formPessoa.value.dataNascimento,
        enderecos: this.formPessoa.value.endereco
      };
      this.cadastro(this.formPessoa.value);

    } else
      if (this.idPessoa != null) {
        var pessoa: Pessoa = {
          id: this.idPessoa, nome: this.formPessoa.value.nome,
          dataNascimento: this.formPessoa.value.dataNascimento,
          enderecos: this.formPessoa.value.endereco
        };

        this.atualiza(pessoa);
      }
  }


  cadastro(p: Pessoa) {
    var pessoa: Pessoa = {
      nome: p.nome,
      dataNascimento: p.dataNascimento,
      enderecos: this.formPessoa.value.endereco
    };
    this.pessoaService.save(pessoa).subscribe(resposta => {

    },
      (error: any) => {


        this.noticacaoService.enviaRespostaParaTelaPeloModal("danger", error);

      });


  }


  atualiza(pessoa: Pessoa) {

    this.pessoaService.update(pessoa).subscribe(resposta => {
      this.noticacaoService.enviaRespostaParaTelaPeloModal("info", "Atualização realizada com sucesso");
    },
      (error: any) => {


        this.noticacaoService.enviaRespostaParaTelaPeloModal("danger", error);

      });

  }


  setarDadosDePessoa(pessoa: any) {
    this.exibeBotaoPdf = true;
    this.idPessoa = pessoa.id;
    this.formPessoa.patchValue({
      id: pessoa.id,
      nome: pessoa.nome,
      dataNascimento: pessoa.dataNascimento,

    });

    let enderecos = pessoa.enderecos;

    for (let endereco of pessoa.enderecos) {

      let idEndereco: FormControl = new FormControl('');
      let logradouro: FormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]);
      let cep: FormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^[0-9]\d*$/)]);
      let numero: FormControl = new FormControl('');
      let cidade: FormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]);
      let principal: FormControl = new FormControl('', Validators.required);

      idEndereco.setValue(endereco.idEndereco);
      logradouro.setValue(endereco.logradouro);
      cep.setValue(endereco.cep);
      numero.setValue(endereco.numero);
      cidade.setValue(endereco.cidade);
      principal.setValue(endereco.principal);

      this.endereco.push(new FormGroup({
        idEndereco: idEndereco,
        logradouro: logradouro,
        cep: cep,
        numero: numero,
        cidade: cidade,
        principal: principal

      }));
    }

    this.endereco.removeAt(0);

    // link de apoio para solução   https://stackoverflow.com/questions/65292461/angular-how-to-patch-value-in-the-form-array



  }


  buscarPessoaPorId(id: number) {
    this.spinner = true;
    let pessoa;
    this.pessoaService.findByPessoa(id).subscribe(resposta => {
      pessoa = resposta;

      this.setarDadosDePessoa(pessoa);
      this.spinner = false;
    },
      (error: any) => {

        this.titulo = "Cadastrar Pessoa";
        this.spinner = false;
        this.noticacaoService.enviaRespostaParaTelaPeloModal("danger", error);

      });
  }

  get endereco(): FormArray {

    return this.formPessoa.controls["endereco"] as FormArray;
  }





  get id() { return this.formPessoa.get('id')!; }
  get nome() { return this.formPessoa.get('nome')!; }
  get dataNascimento() { return this.formPessoa.get('dataNascimento')!; }


  verificaSeTemMaisDeUmEnderecoPrincipal(pessoa: any): boolean {

    let cont = 0;
    for (let endereco of pessoa.endereco) {
      if (endereco.principal == true) {
        cont++;
      }

    }

    if (cont > 1) {


      this.mensagem_erro = "Mais que um endereço principal,só é permitido um endereco principal"
      return false;
    }
    return true;

  }






  gerarRelatorioEnderecosPessoa(content: any) {
    this.modalService.open(content, { size: 'xl' });
    this.pessoaService.gerarRelatorioEnderecosPessoa(this.idPessoa).subscribe(res => {
      document.querySelector('iframe')!.src = res;
      this.spinnerRelatorio = false;

    },
      (error: any) => {
        this.spinnerRelatorio = false;
        this.noticacaoService.enviaRespostaParaTelaPeloModal("danger", error);

      });

  }


}
