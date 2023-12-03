// https://pokeapi.co/api/v2/pokemon/{id or name}/

export const randomPokemonNum = () => {
  return Math.floor(Math.random() * 151) + 1
}

export const shuffle = toBeShuffled => {
  return [...toBeShuffled].sort(() => Math.random() - 0.5)
}
