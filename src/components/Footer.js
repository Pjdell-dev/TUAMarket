import React from 'react'

function Footer() {
  return (
    <div className='Footer' style={{
      backgroundColor: 'black',
      display: 'flex',
      color: 'white'
    }}>

      <h1>Hello World</h1>
      <div className="footerCard2">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqp4EjwhpEjn9Dsiwa5l6bmagh6xGoRgKHDg&s" alt="OPC Logo"></img>
                <div>
                    <h2>Otanon Prime Collectibles</h2>
                    <p>©2025 Otanon Prime Collectibles All Rights Reserved.</p>
                </div>
            </div>
    </div>
    
  )
}

export default Footer