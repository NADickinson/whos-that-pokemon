import { useEffect, useRef } from 'react'

export const PokemonCanvas = ({ pokemon, isPokemonVisible }) => {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!(canvas instanceof HTMLCanvasElement)) {
      return
    }
    const context = canvas.getContext('2d')
    if (!(context instanceof CanvasRenderingContext2D)) {
      return
    }
    const img = new Image()
    img.addEventListener('load', () => {
      canvas.width = img.width
      canvas.height = img.height
      canvas.style.width = '400px'
      canvas.style.height = '400px'
      context.drawImage(img, 0, 0)
      if (!isPokemonVisible) {
        context.globalCompositeOperation = 'source-in'
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.globalCompositeOperation = 'source-over'
      }
    })
    img.src = pokemon
  }, [pokemon, isPokemonVisible])
  const canvasRef = useRef(null)
  return <canvas ref={canvasRef}></canvas>
}
