import { Pessoa } from 'src/app/model/pessoa';
export interface Page {

   
    content: Array<Pessoa>;  
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort?: any;
    numberOfElements: number;
    first: boolean;
}
