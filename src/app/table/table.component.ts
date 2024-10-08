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

  scact: ServiceCallActivities;
  
  serviceCallId: string;

  constructor(private dataService: DataService, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.serviceCallId = this.getParamValueQueryString('serviceCallId');

    this.dataService.getItems(this.serviceCallId).subscribe(
      (response) => {
        if (response.status == "OK") {
          this.scact = response.data;
        }
      },
      (error) => {
        console.error('Error fetching data: ', error);
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
    }, error => {
      console.error('Error al descargar el PDF', error);
    });
  }

}