const pokeapi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.order
    const types = pokeDetail.types.map((typeSlot)=>typeSlot.type.name)
    const [type] = types
    
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.id = pokeDetail.id

    return pokemon; 
}

pokeapi.getPokemonDetail = (pokemon)=>{
   return fetch(pokemon.url)
    .then((response)=>response.json())
    .then(convertPokeApiDetailToPokemon)
}

// Requisição http
pokeapi.getPokemons = (offset=0 , limit = 300 ) =>{
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
       .then((response)=> response.json()) //Arrow function (Normalmente utilizada em callbacks)
       .then((jsonBody)=> jsonBody.results)
       .then((pokemons)=> pokemons.map((pokeapi.getPokemonDetail)))
       .then((detailRequests)=>Promise.all(detailRequests))
       .then((pokemonsDetails)=>pokemonsDetails)
}

//Array de promise 
