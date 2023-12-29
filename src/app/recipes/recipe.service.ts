import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core"

@Injectable()
export class RecipeService {
    recipeChanged = new Subject<Recipe[]>();
    // recipes: Recipe[] = [
    //     new Recipe(
    //         'A Test Recipe One',
    //         'This is simply a test',
    //         'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    //         [
    //             new Ingredient('Meat', 2),
    //             new Ingredient('Sanwitch', 2)
    //         ],
    //     ),
    //     new Recipe(
    //         'A Test Recipe Two',
    //         'This is simply a test',
    //         'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    //         [
    //             new Ingredient('Buns', 5),
    //             new Ingredient('Burgers', 5)
    //         ],
    //     )
    // ];
    private recipes: Recipe[] = [];
    constructor( private slService: ShoppingListService){ }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
      }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }
    addIngredientsToShoppingList (ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    addRecipe(newRecipe: Recipe){
        this.recipes.push(newRecipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe){
        this.recipes[index] = recipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }
}