export const Tally = ({ rightTally, wrongTally }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', minWidth: '20%', paddingTop: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', fontSize: '2rem', color: '#fecb03' }}>
        <div>{'RIGHT'}</div>
        <div>{rightTally}</div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',

          fontSize: '2rem',
          color: '#fecb03',
          padding: '0 20px 0 0',
        }}
      >
        <div>{'WRONG'}</div>
        <div>{wrongTally}</div>
      </div>
    </div>
  )
}
