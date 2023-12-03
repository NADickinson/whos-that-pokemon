export const CustomButton = ({ pokemon, onClick }) => {
  return (
    <button className="custom-button" onClick={onClick}>
      {pokemon}
    </button>
  )
}
