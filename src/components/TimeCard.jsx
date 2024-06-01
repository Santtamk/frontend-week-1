import React from 'react'
import './timeCard.css'

const TimeCard = ({timeDifference, title}) => {
  return (
    <div className='title'>
      <div>
        <h1>{timeDifference}</h1>
        <h4>{title}</h4>
      </div>
    </div>
  )
}

export default TimeCard