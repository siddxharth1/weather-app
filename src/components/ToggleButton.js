import React from 'react'
import './css/DataBody.css'

function ToggleButton() {
  return (
    <div className='switches'>
      <input type="radio" name="unit" id="celciusUnit" defaultChecked />
      <label htmlFor="celciusUnit">°C</label>
      <input type="radio" name="unit" id="fernehiteUnit" />
      <label htmlFor="fernehiteUnit">°F</label>
    </div>
  )
}

export default ToggleButton
