import { useEffect, useRef } from 'react'

export const PokemonCanvas = ({ pokemon }) => {
  useEffect(() => {
    console.log(canvasRef)
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
      context.globalCompositeOperation = 'source-in'
      context.fillRect(0, 0, canvas.width, canvas.height)
    })
    img.src = pokemon
  }, [pokemon])
  const canvasRef = useRef(null)
  return <canvas ref={canvasRef}></canvas>
}
