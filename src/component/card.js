import React from 'react'
import './card.css'

const Card = ({ bgColor, borderColor, title }) => {
    console.log(bgColor)
    console.log(borderColor)
    return (
        <div className='card_div' style={{ backgroundColor: bgColor }}>
            <h1>{title}</h1>
        </div>
    )
}

export default Card