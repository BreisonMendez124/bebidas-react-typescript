import { StateCreator } from "zustand";
import { getCategories, getRecipe, getRecipes } from "../services/RecipeService";
import { Categories, Drink, Drinks, SearchFilters, Recipe } from "../types";
import { FavoritesSliceType } from "./favoritesSlice";

export type RecipesSliceType = { 
    categories: Categories
    drinks: Drinks
    selectedRecipe: Recipe
    modal: boolean
    fetchCategories: () => Promise<void>
    searchRecipies: ( searchFilters : SearchFilters ) => Promise<void>
    selectRecipe: ( id: Drink['idDrink']) => Promise<void>
    closeModal: () => void
}

export const createRecipesSlice: StateCreator<RecipesSliceType & FavoritesSliceType , [] , []  , RecipesSliceType> = ( set ) => ({ 
    categories:{ 
        drinks: []
    },
    drinks: { 
        drinks: []
    },
    modal: false,
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
            selectedRecipe,
            modal: true
        }))
    },
    closeModal: () => { 
        set( ( ) => ( { 
          modal: false,
          selectedRecipe: {} as Recipe 
        }))
    }
})