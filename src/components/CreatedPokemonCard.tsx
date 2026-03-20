import type { CreatedPokemon } from '../types/pokemon'

interface CreatedPokemonCardProps {
  pokemon: CreatedPokemon
  darkMode: boolean
  onDelete: (id: string) => void
}

export function CreatedPokemonCard({ pokemon, darkMode, onDelete }: CreatedPokemonCardProps) {
  const bgColor = darkMode ? 'bg-zinc-900' : 'bg-zinc-100'
  const textColor = darkMode ? 'text-zinc-100' : 'text-zinc-800'
  const borderColor = darkMode ? 'border-zinc-600' : 'border-zinc-300'
  const deleteColor = darkMode ? 'hover:bg-red-900 text-red-400' : 'hover:bg-red-100 text-red-600'

  return (
    <div className={`border-4 ${borderColor} ${bgColor} p-4 relative group`}>
      <button
        type="button"
        onClick={() => onDelete(pokemon.id)}
        className={`absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-xs font-bold border ${deleteColor} ${borderColor} opacity-0 group-hover:opacity-100 transition-opacity`}
      >
        X
      </button>
      <div className="w-full h-32 flex items-center justify-center mb-2">
        <div className={`w-20 h-20 border-4 ${borderColor} ${bgColor} flex items-center justify-center`}>
          <span className={`text-3xl ${textColor}`}>?</span>
        </div>
      </div>
      <p className={`text-center font-mono text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
        CREATED
      </p>
      <p className={`text-center font-bold text-sm uppercase tracking-wide ${textColor}`}>
        {pokemon.name}
      </p>
      <div className="flex justify-center gap-2 mt-2 flex-wrap">
        {pokemon.types.map((type: string) => (
          <span
            key={type}
            className={`text-xs px-2 py-1 font-mono uppercase ${
              darkMode ? 'bg-zinc-700 text-zinc-200' : 'bg-zinc-200 text-zinc-700'
            }`}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  )
}
