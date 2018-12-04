import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, AbstractControl, FormBuilder, FormGroup, FormControl , Validator , FormsModule} from '@angular/forms';
import { Observable, Subject, throwError, of, BehaviorSubject, Subscription } from 'rxjs';
import { ItemsService } from '../_services/items.service';
import { ItemModel } from '../_models/item.model';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit, OnDestroy {

  itemForm: FormGroup;

  item: ItemModel;

  id: number = null;

  readyView: Boolean = false;
  hasFetched: Boolean  = false;
  hasNoItem: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.resolveRoute();
  }

  ngOnDestroy() { }

  resolveRoute() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = +params['id'];
        this.getItem();
      } else {
        this.handleItemNotFound();
      }
     });
  }

  formSubmitEvent($event) {
    if ($event) {
      switch ($event) {
        case 'update' : {
          this.router.navigate(['/items']);
          break;
        }
        case 'add' : {
          break;
        }
      }
    }
  }

  private getItem() {
    const item  = this.itemsService.get(this.id);
    if (item) {
      this.initForm(item);
    } else {
      if (!this.hasFetched) {
        console.log('-- cannot find in local store, trying remote store');
        this.fetchItem();
      } else {
        console.log('-- cannot find in local store and remote store and again in local store!!!!');
        this.handleItemNotFound();
      }
    }
  }

  private handleItemNotFound() {
    this.readyView  = true;
    this.hasNoItem  = true;
    console.log('***** I GIVE UP');
  }

  private fetchItem() {
    this.hasFetched  = true;
    this.itemsService.fetchItem(this.id).subscribe(
      (result) => {
        if (result) {
          this.initForm(result);
        } else {
          console.log('-- cannot find in local store and remote store, trying again in local store');
          this.getItem();
        }
      }
    );
  }

  private initForm(item: ItemModel) {
    console.log('** YAY found the item **');
    this.item  = item;
    this.readyView  = true;
    this.itemForm = new FormGroup({
      title: new FormControl(this.item.title, Validators.required),
      description: new FormControl(this.item.description),
      id: new FormControl(this.item.id, Validators.required)
    });
  }

}
