import { useState, useRef, useEffect } from 'react'

interface HeaderProps {
  darkMode: boolean
  onToggleDarkMode: () => void
  search: string
  onSearchChange: (value: string) => void
  typeFilter: string | null
  onTypeFilterChange: (value: string | null) => void
}

const POKEMON_TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
]

export function Header({ 
  darkMode, 
  onToggleDarkMode,
  search,
  onSearchChange,
  typeFilter,
  onTypeFilterChange
}: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const borderColor = darkMode ? 'border-zinc-700' : 'border-zinc-300'
  const inputBg = darkMode ? 'bg-zinc-900' : 'bg-zinc-50'
  const inputText = darkMode ? 'text-zinc-100' : 'text-zinc-800'
  const btnPrimary = darkMode 
    ? 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border-zinc-600' 
    : 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border-zinc-600'
  const btnSecondary = darkMode 
    ? 'border-zinc-600 text-zinc-300 hover:bg-zinc-800' 
    : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100'
  const dropdownBg = darkMode ? 'bg-zinc-900 border-zinc-600' : 'bg-zinc-50 border-zinc-300'
  const dropdownItem = darkMode ? 'hover:bg-zinc-800 text-zinc-300' : 'hover:bg-zinc-200 text-zinc-700'

  return (
    <header className={`border-b-4 ${borderColor} ${darkMode ? 'bg-zinc-950' : 'bg-zinc-50'} sticky top-0 z-50`}>
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h1 className={`text-2xl font-bold tracking-widest ${darkMode ? 'text-zinc-100' : 'text-zinc-800'}`}>
            POKEDEX
          </h1>
          
          <div className="flex items-center gap-2 flex-1 min-w-64 max-w-2xl">
            <div className={`flex-1 border-2 ${borderColor} ${inputBg}`}>
              <input
                type="text"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search Pokemon..."
                className={`w-full px-3 py-2 text-sm placeholder-zinc-500 focus:outline-none font-mono ${inputText}`}
              />
            </div>
            
            <div className="relative" ref={dropdownRef}>
              <button 
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className={`px-4 py-2 font-bold text-sm tracking-wide border-2 ${typeFilter ? btnPrimary : btnSecondary}`}
              >
                {typeFilter ? `TYPE: ${typeFilter.toUpperCase()}` : 'FILTER'}
              </button>
              
              {showDropdown && (
                <div className={`absolute top-full mt-2 left-0 border-2 ${dropdownBg} z-50 max-h-64 overflow-y-auto min-w-40`}>
                  <button
                    type="button"
                    onClick={() => { onTypeFilterChange(null); setShowDropdown(false) }}
                    className={`w-full px-4 py-2 text-left text-sm font-mono ${!typeFilter ? (darkMode ? 'bg-zinc-700' : 'bg-zinc-200') : ''} ${dropdownItem}`}
                  >
                    ALL TYPES
                  </button>
                  {POKEMON_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => { onTypeFilterChange(type); setShowDropdown(false) }}
                      className={`w-full px-4 py-2 text-left text-sm font-mono capitalize ${typeFilter === type ? (darkMode ? 'bg-zinc-700' : 'bg-zinc-200') : ''} ${dropdownItem}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onToggleDarkMode}
              className={`px-3 py-2 border-2 font-bold text-sm tracking-wide ${btnSecondary}`}
            >
              {darkMode ? 'LIGHT' : 'DARK'}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
