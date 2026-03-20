import { useState, useEffect, useMemo } from 'react'
import type { Pokemon } from '../types/pokemon'
import { fetchPokemonList } from '../api/pokemon'
import { PokemonCard } from './PokemonCard'

interface PokemonGridProps {
  darkMode: boolean
  search: string
  typeFilter: string | null
}

const ITEMS_PER_PAGE = 20

export function PokemonGrid({ darkMode, search, typeFilter }: PokemonGridProps) {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [, setTotalCount] = useState(0)

  const textColor = darkMode ? 'text-zinc-300' : 'text-zinc-700'
  const dividerColor = darkMode ? 'border-zinc-700' : 'border-zinc-300'
  const btnBg = darkMode 
    ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700 border-zinc-600' 
    : 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border-zinc-600'
  const btnDisabled = darkMode 
    ? 'bg-zinc-900 text-zinc-600 border-zinc-800 cursor-not-allowed' 
    : 'bg-zinc-200 text-zinc-400 border-zinc-300 cursor-not-allowed'

  useEffect(() => {
    async function loadPokemon() {
      setLoading(true)
      try {
        const { pokemon: list, details } = await fetchPokemonList(1, 151)
        setAllPokemon(details)
        setTotalCount(list.count)
      } catch (error) {
        console.error('Failed to fetch Pokemon:', error)
      }
      setLoading(false)
    }
    loadPokemon()
  }, [])

  const filteredPokemon = useMemo(() => {
    let result = allPokemon

    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(p => p.name.toLowerCase().includes(searchLower))
    }

    if (typeFilter) {
      result = result.filter(p => p.types.some(t => t.type.name === typeFilter))
    }

    return result
  }, [allPokemon, search, typeFilter])

  const paginatedPokemon = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE
    return filteredPokemon.slice(start, start + ITEMS_PER_PAGE)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredPokemon, page])

  useEffect(() => {
    setPage(1)
  }, [search, typeFilter])

  const totalPages = Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE)

  if (loading) {
    return (
      <div className={`flex justify-center items-center min-h-96 ${textColor}`}>
        <p className="text-2xl font-bold tracking-widest">LOADING...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="mb-4 text-sm font-mono text-zinc-500">
          Showing {filteredPokemon.length} Pokemon
        </div>
        
        {filteredPokemon.length === 0 ? (
          <div className={`text-center py-20 ${textColor}`}>
            <p className="text-xl font-bold">No Pokemon found</p>
            <p className="text-sm mt-2">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {paginatedPokemon.map((p) => (
              <PokemonCard key={p.id} pokemon={p} darkMode={darkMode} />
            ))}
          </div>
        )}

        {filteredPokemon.length > 0 && (
          <div className={`flex justify-center items-center gap-6 mt-10 border-t-4 ${dividerColor} pt-8`}>
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`px-6 py-2 font-bold border-2 ${page === 1 ? btnDisabled : btnBg}`}
            >
              PREV
            </button>
            
            <span className={`font-mono text-sm min-w-32 text-center ${textColor}`}>
              {page} / {totalPages}
            </span>
            
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`px-6 py-2 font-bold border-2 ${page === totalPages ? btnDisabled : btnBg}`}
            >
              NEXT
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
