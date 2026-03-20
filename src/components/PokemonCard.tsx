import type { Pokemon } from '../types/pokemon'

interface PokemonCardProps {
  pokemon: Pokemon
  darkMode: boolean
}

export function PokemonCard({ pokemon, darkMode }: PokemonCardProps) {
  const bgColor = darkMode ? 'bg-zinc-900' : 'bg-zinc-100'
  const textColor = darkMode ? 'text-zinc-100' : 'text-zinc-800'
  const borderColor = darkMode ? 'border-zinc-600' : 'border-zinc-300'
  const hoverBorder = darkMode ? 'hover:border-zinc-400' : 'hover:border-zinc-500'

  return (
    <div className={`border-4 ${borderColor} ${bgColor} p-4 transition-colors cursor-pointer ${hoverBorder}`}>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-full h-32 object-contain mb-2"
      />
      <p className={`text-center font-mono text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
        #{String(pokemon.id).padStart(3, '0')}
      </p>
      <p className={`text-center font-bold text-sm uppercase tracking-wide ${textColor}`}>
        {pokemon.name}
      </p>
      <div className="flex justify-center gap-2 mt-2 flex-wrap">
        {pokemon.types.map((t) => (
          <span
            key={t.slot}
            className={`text-xs px-2 py-1 font-mono uppercase ${
              darkMode ? 'bg-zinc-700 text-zinc-200' : 'bg-zinc-200 text-zinc-700'
            }`}
          >
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  )
}
