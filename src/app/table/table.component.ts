import { Component, OnInit } from "@angular/core";
import { Item } from "../data.model";
import { DataService } from "../data.service";

@Component({
  selector: 'app-table-beto',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  items: Item[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getItems().subscribe(
      (response) => {
        this.items = response.data;
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    );
  }
}