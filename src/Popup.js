import React from 'react'
import "./Popup.css"

const Popup = ({ handleShowPopup }) => {
  return (
    <div className='main-div'>
      <div className='delete-card'>
        <div className='header'>
          <h3 className='popup-heading'>Your Todo is Delete Successfully</h3>
        </div>
        <div className='input-div'>
          <p className='text-yes-no' onClick={handleShowPopup} >OK</p>
        </div>
      </div>
    </div>
  )
}

export default Popup