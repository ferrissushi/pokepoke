import { useState, useEffect, useRef } from 'react'
import type { CreatedPokemon } from '../types/pokemon'

interface CreatePokemonModalProps {
  darkMode: boolean
  isOpen: boolean
  onClose: () => void
  onCreate: (pokemon: CreatedPokemon) => void
}

export function CreatePokemonModal({ darkMode, isOpen, onClose, onCreate }: CreatePokemonModalProps) {
  const [name, setName] = useState('')
  const [types, setTypes] = useState<string[]>([])
  const [image, setImage] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isOpen) {
      setName('')
      setTypes([])
      setImage(null)
      setStep(1)
    }
  }, [isOpen])

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
  const overlayBg = darkMode ? 'bg-black/80' : 'bg-black/50'
  const modalBg = darkMode ? 'bg-zinc-900' : 'bg-white'

  const POKEMON_TYPES = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    if (name.trim() && types.length > 0) {
      onCreate({ id: crypto.randomUUID(), name: name.trim(), types, image: image || undefined })
      onClose()
    }
  }

  const toggleType = (type: string) => {
    setTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  if (!isOpen) return null

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center ${overlayBg}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`w-full max-w-md mx-4 border-4 ${borderColor} ${modalBg}`}>
        <div className={`flex items-center justify-between p-4 border-b-2 ${borderColor}`}>
          <h2 className={`text-xl font-bold ${inputText}`}>CREATE POKEMON</h2>
          <button
            type="button"
            onClick={onClose}
            className={`w-8 h-8 flex items-center justify-center font-bold border-2 ${btnOutline}`}
          >
            X
          </button>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className={`text-lg font-bold ${inputText}`}>Step 1: Name</h3>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Pokemon name..."
                className={`w-full px-4 py-3 border-2 ${borderColor} ${inputBg} ${inputText} focus:outline-none text-lg`}
              />
              <button
                type="button"
                onClick={() => name.trim() && setStep(2)}
                disabled={!name.trim()}
                className={`w-full px-6 py-3 font-bold border-2 ${name.trim() ? btnBg : 'bg-zinc-700 text-zinc-500 border-zinc-700 cursor-not-allowed'}`}
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
                    className={`px-3 py-2 text-sm font-mono capitalize border-2 ${types.includes(type) ? typeSelected : typeAvailable} ${
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
                  className={`flex-1 px-6 py-3 font-bold border-2 ${btnOutline}`}
                >
                  BACK
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={types.length === 0}
                  className={`flex-1 px-6 py-3 font-bold border-2 ${types.length > 0 ? btnBg : 'bg-zinc-700 text-zinc-500 border-zinc-700 cursor-not-allowed'}`}
                >
                  NEXT
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className={`text-lg font-bold ${inputText}`}>Step 3: Add Image (Optional)</h3>
              <div 
                className={`border-4 border-dashed ${borderColor} p-4 cursor-pointer hover:opacity-80 transition-opacity`}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {image ? (
                  <img src={image} alt="Preview" className="w-full h-48 object-contain" />
                ) : (
                  <div className={`text-center py-8 ${inputText}`}>
                    <p className="text-4xl mb-2">+</p>
                    <p className="text-sm">Click to upload image</p>
                  </div>
                )}
              </div>
              {image && (
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className={`w-full text-sm ${inputText} hover:underline`}
                >
                  Remove image
                </button>
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className={`flex-1 px-6 py-3 font-bold border-2 ${btnOutline}`}
                >
                  BACK
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className={`flex-1 px-6 py-3 font-bold border-2 ${btnBg}`}
                >
                  CREATE
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
