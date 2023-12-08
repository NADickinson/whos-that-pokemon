import { VolumeOff } from '../icons/VolumeOff'
import { VolumeOn } from '../icons/VolumeOn'

export const AudioButton = ({ isMuted, onClick }) => {
  return (
    <button
      style={{ height: '50px', width: '50px', background: 'none', border: 0, appearance: 0, cursor: 'pointer' }}
      onClick={onClick}
    >
      {isMuted ? (
        <VolumeOff style={{ height: '50px', width: '50px' }} />
      ) : (
        <VolumeOn style={{ height: '50px', width: '50px' }} />
      )}
    </button>
  )
}
