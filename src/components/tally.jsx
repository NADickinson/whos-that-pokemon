export const Tally = ({ rightTally, wrongTally }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', minWidth: '20%' }}>
      <div
        style={{ display: 'flex', flexDirection: 'column', fontFamily: 'fantasy', fontSize: '2rem', color: '#fecb03' }}
      >
        <div>{'RIGHT'}</div>
        <div>{rightTally}</div>
      </div>
      <div
        style={{ display: 'flex', flexDirection: 'column', fontFamily: 'fantasy', fontSize: '2rem', color: '#fecb03' }}
      >
        <div>{'WRONG'}</div>
        <div>{wrongTally}</div>
      </div>
    </div>
  )
}
