import { Component, OnInit } from '@angular/core';
import { Observable, Subject,throwError, of , BehaviorSubject} from 'rxjs';

import { ItemsService } from '../_services/items.service';
import { ItemModel } from '../_models/item.model';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  items$: BehaviorSubject<ItemModel[]>;

  constructor(
    private itemsService: ItemsService
  ) { }

  ngOnInit() {
    this.items$  = this.itemsService.items$;
  }

}
