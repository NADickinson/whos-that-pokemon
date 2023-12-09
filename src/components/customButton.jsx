export const CustomButton = ({ pokemon, onClick }) => {
  return (
    <button style={{ textTransform: 'uppercase' }} className="custom-button" onClick={onClick}>
      {pokemon}
    </button>
  )
}
