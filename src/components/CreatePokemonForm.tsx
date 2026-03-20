import { useState } from 'react'

interface CreatedPokemon {
  id: string
  name: string
  types: string[]
}

interface CreatePokemonFormProps {
  darkMode: boolean
  onCreate: (pokemon: CreatedPokemon) => void
}

export function CreatePokemonForm({ darkMode, onCreate }: CreatePokemonFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [types, setTypes] = useState<string[]>([])
  const [step, setStep] = useState(1)

  const borderColor = darkMode ? 'border-zinc-600' : 'border-zinc-300'
  const inputBg = darkMode ? 'bg-zinc-900' : 'bg-zinc-100'
  const inputText = darkMode ? 'text-zinc-100' : 'text-zinc-800'
  const btnBg = darkMode 
    ? 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border-zinc-600' 
    : 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border-zinc-600'
  const btnOutline = darkMode 
    ? 'border-zinc-600 text-zinc-300 hover:bg-zinc-800' 
    : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100'
  const typeSelected = darkMode ? 'bg-zinc-700' : 'bg-zinc-300'
  const typeAvailable = darkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-200 hover:bg-zinc-300'

  const POKEMON_TYPES = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ]

  const handleSubmit = () => {
    if (name.trim() && types.length > 0) {
      onCreate({ id: crypto.randomUUID(), name: name.trim(), types })
      setName('')
      setTypes([])
      setStep(1)
      setIsOpen(false)
    }
  }

  const toggleType = (type: string) => {
    setTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  return (
    <div className={`border-b-4 ${borderColor} ${darkMode ? 'bg-zinc-900' : 'bg-zinc-100'}`}>
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`px-4 py-2 font-bold text-sm tracking-wide border-2 ${isOpen ? btnBg : btnOutline}`}
          >
            {isOpen ? 'CLOSE' : 'CREATE POKEMON'}
          </button>
        </div>

        {isOpen && (
          <div className={`mt-4 p-4 border-2 ${borderColor} ${darkMode ? 'bg-zinc-950' : 'bg-white'}`}>
            <div className="max-w-md mx-auto">
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className={`text-lg font-bold ${inputText}`}>Step 1: Name</h3>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Pokemon name..."
                    className={`w-full px-4 py-2 border-2 ${borderColor} ${inputBg} ${inputText} focus:outline-none`}
                  />
                  <button
                    type="button"
                    onClick={() => name.trim() && setStep(2)}
                    disabled={!name.trim()}
                    className={`w-full px-6 py-2 font-bold border-2 ${name.trim() ? btnBg : 'bg-zinc-700 text-zinc-500 border-zinc-700 cursor-not-allowed'}`}
                  >
                    NEXT
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className={`text-lg font-bold ${inputText}`}>Step 2: Select Types (1-2)</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {POKEMON_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => types.length < 2 || types.includes(type) ? toggleType(type) : null}
                        disabled={types.length >= 2 && !types.includes(type)}
                        className={`px-3 py-2 text-xs font-mono capitalize border-2 ${types.includes(type) ? typeSelected : typeAvailable} ${
                          types.length >= 2 && !types.includes(type) ? 'opacity-50 cursor-not-allowed' : ''
                        } ${darkMode ? 'border-zinc-600' : 'border-zinc-300'} ${inputText}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className={`flex-1 px-6 py-2 font-bold border-2 ${btnOutline}`}
                    >
                      BACK
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={types.length === 0}
                      className={`flex-1 px-6 py-2 font-bold border-2 ${types.length > 0 ? btnBg : 'bg-zinc-700 text-zinc-500 border-zinc-700 cursor-not-allowed'}`}
                    >
                      CREATE
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
