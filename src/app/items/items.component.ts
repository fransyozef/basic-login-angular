import { Component, OnInit } from '@angular/core';
import { ItemModel } from './_models/item.model';
import { ItemsService } from './_services/items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  constructor(
    private itemsService: ItemsService
  ) { }

  ngOnInit() {
  }

}
