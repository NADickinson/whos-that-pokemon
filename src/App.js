import { useEffect, useMemo, useState } from 'react'
import { getPokemon } from './api/getPokemon'
import { randomPokemonNum, shuffle } from './utils/utils'
import { CustomButton } from './components/customButton'
import { Tally } from './components/tally'
import { PokemonCanvas } from './components/PokemonCanvas'
import { AudioButton } from './components/audioButton'

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
  const [isPokemonVisible, setIsPokemonVisible] = useState(false)
  const [isMuted, setIsMuted] = useState(() => {
    return window.localStorage.getItem('isMuted') === 'true'
  })

  useEffect(() => {
    window.localStorage.setItem('isMuted', isMuted)
  }, [isMuted])

  const loadPokemon = async () => {
    const fourPokemonNums = await getFourPokemon()
    setCurrentCorrectPokemon(fourPokemonNums.correct)
    setWrongPokemon(fourPokemonNums.wrongPokemonArray)
  }

  useEffect(() => {
    loadPokemon()
  }, [])
  const audio = useMemo(() => new Audio(), [])
  useEffect(() => {
    if (!currentCorrectPokemon) return

    audio.src = './whos_that_pokemon.mp3'
    audio.load()
    audio.play()
  }, [currentCorrectPokemon, audio])

  useEffect(() => {
    audio.muted = isMuted
  }, [isMuted, audio])

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
        <div style={{ flex: 1, padding: '50px 0 0 220px' }}>
          {currentCorrectPokemon?.img ? (
            <PokemonCanvas pokemon={currentCorrectPokemon.img} isPokemonVisible={isPokemonVisible}></PokemonCanvas>
          ) : undefined}
        </div>
        <Tally rightTally={correctTally} wrongTally={incorrectTally} />
        <div style={{ position: 'absolute', top: 0, left: 0, padding: '20px' }}>
          <AudioButton
            isMuted={isMuted}
            onClick={() => {
              setIsMuted(!isMuted)
            }}
          />
        </div>
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
                      setIsPokemonVisible(true)
                      setTimeout(async () => {
                        await loadPokemon()
                        setIsPokemonVisible(false)
                      }, 2500)
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
