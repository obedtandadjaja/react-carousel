import React from 'react'

const Dot = ({ id, active, dotClick }) => {
  return <div className={active ? 'dot active' : 'dot'} onClick={() => dotClick(id)} />
}

export default Dot
