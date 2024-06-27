import { z } from "zod";
import { CategoriesAPIResponseSchema , DrinksAPIResponse, SearchRecipesAPIResonseSchema } from "../schemas/recipes-schema";

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>
export type SearchFilters = z.infer< typeof SearchRecipesAPIResonseSchema>
export type Drinks = z.infer< typeof DrinksAPIResponse>