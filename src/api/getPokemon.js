export const getPokemon = async id => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
  const responseData = await response.json()
  console.log(responseData)
  return {
    img: responseData.sprites.other['official-artwork'].front_default,
    name: responseData.name,
    id: responseData.id,
  }
}
