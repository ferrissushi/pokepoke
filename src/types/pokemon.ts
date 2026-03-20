export interface Pokemon {
  id: number
  name: string
  sprites: {
    front_default: string
  }
  types: {
    slot: number
    type: {
      name: string
    }
  }[]
}

export interface PokemonListItem {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
}

export interface CreatedPokemon {
  id: string
  name: string
  types: string[]
}
