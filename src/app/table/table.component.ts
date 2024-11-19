import { Component, OnInit } from "@angular/core";
import { Item, ServiceCallActivities } from "../data.model";
import { DataService } from "../data.service";
import { interval } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { HttpClient, HttpParams } from "@angular/common/http";
import { PREFIX_DOMAIN_API } from "src/environments/environment";
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-table-beto',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  private pdfurl = PREFIX_DOMAIN_API + 'descargarreporte?idActividad='; // URL de tu servicio REST

  serviceCallId: number;
  itemCode: string;
  internalSerialNum: string;
  manufacturerSerialNum: string;

  isLoading = false;
  
  actividades: any;

  constructor(private dataService: DataService, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    
    this.isLoading = true;

    this.serviceCallId = this.getParamValueQueryString('serviceCallId');

    this.dataService.getItems(this.serviceCallId).subscribe(
      (response) => {
        if (response.status == "OK") {
          this.serviceCallId = response.data.serviceCallID;
          this.itemCode = response.data.itemCode;
          this.internalSerialNum = response.data.internalSerialNum;
          this.manufacturerSerialNum = response.data.manufacturerSerialNum;
          this.actividades = response.data.actividades;
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching data: ', error);
        this.isLoading = false;
      }
    );
    
  }

  getParamValueQueryString( paramName ) {
    const url = window.location.href;
    let paramValue;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      paramValue = httpParams.get(paramName);
    }
    return paramValue;
  }

  downloadPDF(actividadId: string) {
    
    this.isLoading = true;

    const url = this.pdfurl + actividadId; // Cambia esto por la URL de tu API

    this.http.get<{ data: string }>(url).subscribe(response => {
      const archivoBase64 = response.data;
            const byteString = atob(archivoBase64);
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);

            for (let i = 0; i < byteString.length; i++) {
              ia[i] = byteString.charCodeAt(i);
            }

            const blob = new Blob([ab], {
              type: 'application/pdf'
            });

            FileSaver.saveAs(blob, "informe-" + actividadId + ".pdf");
            this.isLoading = false;
    }, error => {
      console.error('Error al descargar el PDF', error);
      this.isLoading = false;
    });

  }

}