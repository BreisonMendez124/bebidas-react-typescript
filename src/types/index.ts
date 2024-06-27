import { z } from "zod";
import { CategoriesAPIResponseSchema , SearchRecipesAPIResonseSchema } from "../schemas/recipes-schema";

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>
export type SearchFilters = z.infer< typeof SearchRecipesAPIResonseSchema>