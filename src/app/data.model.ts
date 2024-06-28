export interface Item {
    numero: string;
    empleado: string;
    cliente: string;
    tareasARealizar: string;
    estado: string;
  }

export interface ResponseData {
  status: string;
  data: Item[];
}