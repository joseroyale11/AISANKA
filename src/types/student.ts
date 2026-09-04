export interface Student {

  nombre:string;

  correo:string;

  discapacidad:
    | 'AUTISMO'
    | 'VISUAL'
    | 'AUDITIVA'
    | 'TDAH'
    | 'NORMAL';

  idioma:string;

  edad:number;

}