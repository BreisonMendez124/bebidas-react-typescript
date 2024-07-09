import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header(){

    const [ searchFilters , setSearchFilters ] = useState({
        ingredient: '',
        category:''
    })
    const { pathname } = useLocation();//Saber la ubicacion de la pagina actual activa
    const isHome = useMemo( () => pathname === '/' , [ pathname ]);
    const fetchCategories = useAppStore( ( state ) => state.fetchCategories );
    const categories = useAppStore( ( state ) => state.categories );
    const searchRecipies = useAppStore( ( state ) => state.searchRecipies );
    const showNotification = useAppStore( ( state ) => state.showNotification )
    useEffect( ( ) => { 
        fetchCategories()
    } , [ ])

    const handleChangeEvent = ( e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> ) => { 
        setSearchFilters({
            ...searchFilters,
            [ e.target.name ]: e.target.value
        })
    }

    const onSubmit = ( e : React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
        //TODO: Validar
        if( Object.values( searchFilters ).includes('')){
            showNotification({ 
                text: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        //Consultar la receta
        searchRecipies( searchFilters );


    }

    return (
        <header className={ isHome ? 'bg-header bg-center bg-cover' : "bg-slate-800"}>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div className="">
                        <img src="/logo.svg" 
                             alt="logotipo" 
                             className="w-32" />
                    </div>
                    <nav className="flex gap-4">
                        <NavLink 
                            to="/"
                            className={({ isActive }) => 
                                isActive ? 'text-orange-500 uppercase font-bold': 'text-white uppercase font-bold'
                        }> Inicio </NavLink>

                        <NavLink 
                            to="/favoritos"
                            className={({ isActive }) => 
                                isActive ? 'text-orange-500 uppercase font-bold': 'text-white uppercase font-bold'
                        }> Favoritos </NavLink>
                    </nav>
                </div>
                { isHome && ( 
                    <form
                        onSubmit={ onSubmit }
                        className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6" >
                            <div className="space-y-4">

                                <label htmlFor="ingredient"
                                        className="block text-white uppercase font-extrabold text-lg"> 
                                Nombre o Ingredientes</label>
                                <input 
                                    id="ingredient"
                                    type="text"
                                    name="ingredient"
                                    className="p-3 w-full rounded-lg focus:outline-none"
                                    onChange={ handleChangeEvent }
                                    value={ searchFilters.ingredient }
                                    placeholder="Nombre o Ingrediente. Ej. Vodkal, Tequila, Café" />
                            </div>

                            <div className="space-y-4">

                                <label htmlFor="category"
                                        className="block text-white uppercase font-extrabold text-lg"> 
                                Categoria</label>
                                <select
                                    id="category"
                                    name="category"
                                    onChange={ handleChangeEvent }
                                    value={ searchFilters.category }
                                    className="p-3 w-full rounded-lg focus:outline-none"
                                >
                                  <option value="">-- Seleccione --</option>  
                                  {categories.drinks.map( category => ( 
                                    <option 
                                            key={ category.strCategory }
                                            value={ category.strCategory }>
                                    { category.strCategory }</option>
                                  ) ) }
                                </select>
                            </div>
                            <input 
                                type="submit"
                                value="Buscar Recetas"
                                className="cursos-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
                            />
                    </form>
                )}

            </div>
        </header>
    )
}