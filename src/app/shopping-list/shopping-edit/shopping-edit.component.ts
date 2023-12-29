import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output, OnDestroy} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscribtion: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  // @Output() ingregentEdded = new EventEmitter<Ingredient>();
  constructor( private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscribtion = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        })
      }
    )
  }

  onSubmit(form: NgForm){
    // const nameValue = this.nameInputRef.nativeElement.value;
    // const amountValue = this.amountInputRef.nativeElement.value;
    const value = form.value;
    
    const ingredient = new Ingredient(value.name, value.amount)
    // this.ingregentEdded.emit(ingredient)
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, ingredient)
    } else {
      this.slService.addIngredient(ingredient);
    }
    this.editMode = false;
    form.reset();
  }

  ngOnDestroy(): void {
      this.subscribtion.unsubscribe();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
