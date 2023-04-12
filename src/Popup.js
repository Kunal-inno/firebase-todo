import React from 'react'
import "./Popup.css"

const Popup = ({ handleShowPopup }) => {
  return (
    <div className="py-8 mt-7 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 
      sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 delete-card">
      <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5 mt-10">
          <p className="text-lg text-red-500 font-semibold">
            Your Todo is Delete Successfully!
          </p>
        </div>
        <div className='input-div'>
          <button className="px-4 w-5/12 mt-10 py-1 text-sm text-purple-600 font-semibold rounded-full border
            border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent 
            focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            onClick={handleShowPopup}
          >OK</button>
        </div>
      </div>
    </div>
  )
}

export default Popup