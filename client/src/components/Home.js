import React from 'react';
import { useState, useEffect } from 'react';
import{ useDispatch, useSelector} from 'react-redux';
import { filterByName, filterSource, filterStrength, filterType, getPokemons, getTypes } from '../redux/actions';
import { Link } from 'react-router-dom';
import  Card  from './Card';
import Paginado from './Paginado';
import SearchBar from './Searchbar';
import '../styles/Home.css'

export default function Home(){

    const dispatch = useDispatch(); 
    const allPokemons = useSelector((state) => state.pokemons); 
    const allTypes = useSelector((state) => state.types);


    //PAGINACION
    const [currentPage, setCurrentPage] = useState(1)//guarda la pag actual
    const [pokemonPerPage, setPokemonPerPage] = useState(12)//guarda los pokemon q quiero por pag
    const indexOfLast = currentPage * pokemonPerPage
    const indexOfFirst = indexOfLast - pokemonPerPage
    const currentPokemon = allPokemons.slice(indexOfFirst, indexOfLast)//los pokemon de la pag actual
    const paginado = (pageNumber) => setCurrentPage(pageNumber)
    
    const [order,setOrder] = useState("")
    
    useEffect(() => {
        dispatch(getPokemons())//
    }, [dispatch])

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons());
    }
    
    function handleFilterByName(e){
        dispatch(filterByName(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
        e.preventDefault();
    }

    function handleStrength(e){
        dispatch(filterStrength(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
        e.preventDefault();
    }

    function handleSource(e){
        dispatch(filterSource(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
        e.preventDefault()
    }

    function handleType(e){
        dispatch(filterType(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
        e.preventDefault()
    }

    //FILTRO
/* [ ] Botones/Opciones para filtrar por tipo de pokemon
 y por pokemon existente o creado por nosotros
[ ] Botones/Opciones para ordenar tanto ascendentemente como
 descendentemente los pokemons por orden alfabético y por ataque */

    return(
        <div>
        <div className="top_nav">
            <img className='img_pokemon' />
            <Link className="link_create" to='/pokemons'>Create</Link>
            <h1 className="home_title">POKEMON</h1>
            <button className="btn_reload" onClick={e => {handleClick(e)}}>Refresh</button>
            </div>
            <div className="filters">
                <select onChange={(e) => {handleFilterByName(e)}}>
                    <option value=''>Order By Name</option>
                    <option value='asc'>A - Z</option>
                    <option value='desc'>Z - A</option>
                </select>
                <select onChange={(e) => {handleType(e)}}>
                    <option>Order By Type</option>
                    <option value='all'>All</option>
                    {allTypes?.map((e) => {
                        return(
                            <option value={e} key={e.id}>{e}</option>
                        )
                    })}
                </select>
                <select onChange={(e) => {handleSource(e)}}>
                    <option>Filter By Source</option>
                    <option value='all'>All</option>
                    <option value='api'>API</option>
                    <option value='created'>Created</option>
                </select>
                <select onChange={(e) => {handleStrength(e)}}>
                    <option value=''>Order By Strength</option>
                    <option value='max'>Higher</option>
                    <option value='min'>Lower</option>
                    
                </select>  
                <div>
            <Paginado
            pokemonPerPage={pokemonPerPage}
            allPokemons={allPokemons.length}
            paginado={paginado}
            />
            <SearchBar
            page = {paginado}
            />
            </div>              
            </div>
            <div className="cards">

            {
                currentPokemon?.map((e) => {
                    return(
                        <fragment >
                            <Link   className="text_frag" to={`/pokemons/${e.id}`}>
                            <Card name={e.name} 
                                  image={e.image}/>
                            </Link>
                        </fragment>
                        )
                    })
                }
                
                </div>
                </div>
    )
}