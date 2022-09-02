import { Endereco } from "./endereco";


export interface Pessoa{
    id?:number; 
    nome: string;
    dataNascimento:Date;
    enderecos:Endereco[];
}