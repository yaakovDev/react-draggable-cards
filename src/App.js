import './index.css'

import React from 'react'

export const App = () => {
  
  const renderCards = () => { 
    return [...Array(30).keys()].map( i => { 
      return (<div key={i} draggable className="card-flex-item">
        {i}
        </div>
        )

    })
   }  
  
  return (
    <div className='cards-flex-container'>
        {renderCards()}
    </div>
  )
}

export default App  