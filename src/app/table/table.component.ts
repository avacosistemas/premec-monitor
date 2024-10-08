import { Component, OnInit } from "@angular/core";
import { Item } from "../data.model";
import { DataService } from "../data.service";
import { interval } from "rxjs";

@Component({
  selector: 'app-table-beto',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  items: Item[] = [];

  skip: string = "";

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    const source = interval(10000);
    source.subscribe(x => {
      this.actualizar();
    });
  }

  actualizar() {
    this.dataService.getItems(this.skip).subscribe(
      (response) => {
        if (response.status == "OK") {
          this.items = response.data;
          this.skip = response.data[0].skip;
        }
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    );
  }

}