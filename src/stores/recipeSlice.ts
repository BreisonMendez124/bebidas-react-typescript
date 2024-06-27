import { StateCreator } from "zustand";
import { getCategories } from "../services/RecipeService";
import { Categories, SearchFilters } from "../types";

export type RecipesSliceType = { 
    categories: Categories
    fetchCategories: () => Promise<void>
    searchRecipies: ( searchFilters : SearchFilters ) => Promise<void>
}

export const createRecipesSlice: StateCreator<RecipesSliceType> = ( set ) => ({ 
    categories:{ 
        drinks: []
    },
    fetchCategories: async ( )=> { 
        const categories = await getCategories();
        set( () => ( { 
            categories
        }) )
    },
    searchRecipies: async ( searchRecipies ) => { 
        console.log("consultando...")
        console.log( searchRecipies )
    }
})