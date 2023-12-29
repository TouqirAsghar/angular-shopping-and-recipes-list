import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    ingregientChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    getIngredients(){
        return this.ingredients.slice();
    }
    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingregientChanged.next(this.ingredients);
    }
    updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingregientChanged.next(this.ingredients);
    }
    getIngredient(index: number){
        return this.ingredients[index];
    }
    addIngredients(ingredients: Ingredient[]){
        // for (const ingredient of ingredients) {
        //     this.ingredients.push(ingredient); 
        // }
        this.ingredients.push(...ingredients); 
        this.ingregientChanged.next(this.ingredients.slice());
    }
    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingregientChanged.next(this.ingredients.slice());
    }
}