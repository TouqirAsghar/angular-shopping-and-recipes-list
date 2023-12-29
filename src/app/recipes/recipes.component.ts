import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    // this.recipeService.selectedRecipe.subscribe(
    //   (recipe: Recipe) => {
    //     this.selectedRecipe = recipe;
    //   }
    // )
    
  }

  // selectedlastRecipe(recipe: Recipe){
  //   console.log(recipe);
    
  //   this.selectedRecipe = recipe;
  // }
}
