import { StateCreator } from "zustand";
import { getCategories, getRecipe, getRecipes } from "../services/RecipeService";
import { Categories, Drink, Drinks, SearchFilters, Recipe } from "../types";

export type RecipesSliceType = { 
    categories: Categories
    drinks: Drinks
    selectedRecipe: Recipe
    fetchCategories: () => Promise<void>
    searchRecipies: ( searchFilters : SearchFilters ) => Promise<void>
    selectRecipe: ( id: Drink['idDrink']) => Promise<void>
}

export const createRecipesSlice: StateCreator<RecipesSliceType> = ( set ) => ({ 
    categories:{ 
        drinks: []
    },
    drinks: { 
        drinks: []
    },
    selectedRecipe: {} as Recipe,
    fetchCategories: async ( )=> { 
        const categories = await getCategories();
        set( () => ( { 
            categories
        }) )
    },
    searchRecipies: async ( searchRecipies ) => { 
        const drinks = await getRecipes( searchRecipies );
        set( () => ( { 
           drinks
        }))
    },
    selectRecipe: async ( idDrink ) => { 
        const selectedRecipe = await getRecipe( idDrink );
        set( () => ({ 
            selectedRecipe
        }))
    }
})