import axios from "axios";
import { CategoriesAPIResponseSchema } from "../schemas/recipes-schema";

export async function getCategories(){ 
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const {data : response } = await axios( url );
    const result = CategoriesAPIResponseSchema.safeParse( response );    
    if( result.success ){ 
        return result.data
    }
}