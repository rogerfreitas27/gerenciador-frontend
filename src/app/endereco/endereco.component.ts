import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EnderecoDto } from 'src/app/model/endereco-dto';


@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {
  id!: number;
  formEnderecoDto!: FormGroup;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pegaParametroUrl();
  }

  pegaParametroUrl() {
    this.carregarFormEnderecoDto();

    this.route.params.subscribe(params => {

      if (params.id) {

        this.id = params.id;

      }



    });
  }





  carregarFormEnderecoDto() {
    this.formEnderecoDto = new FormGroup({


      logradouro: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      cep: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^[0-9]\d*$/)]),
      numero: new FormControl('', []),
      cidade: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      principal: new FormControl('', [Validators.required]),
      idPessoa: new FormControl('', [Validators.required])

    });

    this.formEnderecoDto.patchValue({
      idPessoa: this.id
    });
  }


  onSubmit() {

  }


  get logradouro() { return this.formEnderecoDto.get('logradouro')!; }
  get cep() { return this.formEnderecoDto.get('cep')!; }
  get numero() { return this.formEnderecoDto.get('numero')!; }
  get cidade() { return this.formEnderecoDto.get('cidade')!; }
  get principal() { return this.formEnderecoDto.get('principal')!; }
  get idPessoa() { return this.formEnderecoDto.get('idPessoa')!; }

}
