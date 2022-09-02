import { Pessoa } from "./pessoa";

export interface  Endereco{ 
    idEndereco?:number;
    logradouro: string;
    cep: string;
    numero:number;
    cidade:string;
    principal:boolean;
    pessoa:Pessoa;


}