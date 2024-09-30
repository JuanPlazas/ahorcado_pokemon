export const fetchPokemons = async (idPokemon: number) => {
  /** Solo se trae los primeros 151 que son los de la primera generacion */
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+idPokemon)

  if(response.status != 200) {
    throw new Error("No se pudo obtener los datos del PokeApi")
  }
  return response.json()
}