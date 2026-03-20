import type { Pokemon, PokemonListResponse } from '../types/pokemon'

const BASE_URL = 'https://pokeapi.co/api/v2'

export async function fetchPokemonList(page: number = 1, limit: number = 20): Promise<{
  pokemon: PokemonListResponse
  details: Pokemon[]
}> {
  const offset = (page - 1) * limit
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)
  const pokemonList: PokemonListResponse = await response.json()

  const detailsPromises = pokemonList.results.map(async (pokemon) => {
    const res = await fetch(pokemon.url)
    return res.json() as Promise<Pokemon>
  })

  const details = await Promise.all(detailsPromises)

  return { pokemon: pokemonList, details }
}
