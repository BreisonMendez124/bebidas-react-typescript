import { z } from "zod";

export const CategoriesAPIResponseSchema = z.object({ 
    drinks: z.array(
        z.object({ 
            strCategory: z.string()
        })
    )
})

export const SearchRecipesAPIResonseSchema = z.object({ 
    ingredient: z.string(),
    category: z.string()
})