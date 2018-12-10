import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { ItemModel } from '../_models/item.model';
import { ItemsService } from '../_services/items.service';

@Component({
  selector: 'app-items-list-item',
  templateUrl: './items-list-item.component.html',
  styleUrls: ['./items-list-item.component.css']
})
export class ItemsListItemComponent implements OnInit {

   @Input() item: ItemModel;

  constructor(
    private itemsService: ItemsService,
    private router: Router,
  ) { }

  ngOnInit() {
    // console.log(this.item);
  }

  edit() {
    this.router.navigate(['/item-edit/' + this.item.id]);
  }

  delete() {
    this.itemsService.delete(this.item.id).subscribe();
  }

}
