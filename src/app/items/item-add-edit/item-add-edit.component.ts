import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, AbstractControl, FormBuilder, FormGroup, FormControl , Validator , FormsModule} from '@angular/forms';
import { Observable, Subject , Subscription, BehaviorSubject } from 'rxjs';
import { CheckRequiredField } from '../../_shared/helpers/form.helper';

import { ItemsService } from '../_services/items.service';
import { ItemModel } from '../_models/item.model';

@Component({
  selector: 'app-item-add-edit',
  templateUrl: './item-add-edit.component.html',
  styleUrls: ['./item-add-edit.component.css']
})
export class ItemAddEditComponent implements OnInit {

  @Input() item: ItemModel;
  @Output() formSubmitEvent = new EventEmitter<string>();

  itemForm: FormGroup;

  isProcessing: Boolean = false;

  checkField  = CheckRequiredField;

  constructor(
    private itemsService: ItemsService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  onSubmit($event) {

    this.isProcessing  = true;

    if (this.itemForm.valid) {
        if (!this.item) {
          this.doAddItem();
        } else {
          this.doUpdateItem();
        }
    }
  }

  getButtonText(): string {
    return this.item ? 'Update' : 'Add';
  }

  private doAddItem() {
    this.itemsService.add(this.itemForm.value).subscribe(
      (result) => {
        this.itemForm.reset();
        this.formSubmitEvent.next('add');
        this.isProcessing  = false;
      }
    );
  }

  private doUpdateItem() {
    this.itemsService.update(this.itemForm.value.id , this.itemForm.value).subscribe(
      (result) => {
        if (result) {
          this.formSubmitEvent.next('update');
          this.reset();
        }
        this.isProcessing  = false;
      }
    );
  }

  private reset() {
    this.item  = null;
    this.itemForm.reset();
    this.initForm();
  }

  private initForm() {
    this.itemForm = new FormGroup({
      title: new FormControl(this.item ? this.item.title : '', Validators.required),
      description: new FormControl(this.item ? this.item.description : ''),
      id: new FormControl(this.item ? this.item.id : null),
    });
  }

}
