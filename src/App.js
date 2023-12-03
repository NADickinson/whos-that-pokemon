import { useEffect, useMemo, useState } from 'react'
import { getPokemon } from './api/getPokemon'
import { randomPokemonNum, shuffle } from './utils/utils'
import { CustomButton } from './components/customButton'
import { Tally } from './components/tally'
import { PokemonCanvas } from './components/PokemonCanvas'

const getFourPokemon = async () => {
  const idArray = []

  while (idArray.length < 4) {
    const num = randomPokemonNum()
    if (!idArray.includes(num)) {
      idArray.push(num)
    }
  }

  const finalArray = await Promise.all(idArray.map(getPokemon))

  return {
    correct: finalArray[0],
    wrongPokemonArray: finalArray.slice(1),
  }
}

export const App = () => {
  const [currentCorrectPokemon, setCurrentCorrectPokemon] = useState(undefined)
  const [wrongPokemon, setWrongPokemon] = useState(undefined)
  const [correctTally, setCorrectTally] = useState(0)
  const [incorrectTally, setIncorrectTally] = useState(0)

  const loadPokemon = async () => {
    const fourPokemonNums = await getFourPokemon()
    setCurrentCorrectPokemon(fourPokemonNums.correct)
    setWrongPokemon(fourPokemonNums.wrongPokemonArray)
  }

  useEffect(() => {
    loadPokemon()
  }, [])

  const shuffledArray = useMemo(() => {
    return currentCorrectPokemon && wrongPokemon ? shuffle([...wrongPokemon, currentCorrectPokemon]) : []
  }, [currentCorrectPokemon, wrongPokemon])

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <img
          alt=""
          src={'/whos-that-pokemon-background.webp'}
          style={{ objectFit: 'fill', width: '100%', height: '100%' }}
        ></img>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', flex: '1' }}>
        <div>
          {currentCorrectPokemon?.img ? <PokemonCanvas pokemon={currentCorrectPokemon.img}></PokemonCanvas> : undefined}
        </div>
        <Tally rightTally={correctTally} wrongTally={incorrectTally} />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ maxWidth: '1350px', padding: '50px', flex: '1', display: 'flex' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {shuffledArray.map(pokemon => {
              return (
                <CustomButton
                  onClick={() => {
                    if (pokemon.id === currentCorrectPokemon.id) {
                      setCorrectTally(correctTally + 1)
                      loadPokemon()
                    } else {
                      setIncorrectTally(incorrectTally + 1)
                    }
                  }}
                  key={pokemon.id}
                  pokemon={pokemon.name}
                ></CustomButton>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
