import React from 'react'
import './card.css'

const FoodCard = ({ name, img, price, desc, deleteItem, editItem }) => {
    return (
        <div className='card_div'>
            <img src={img} height={200} width={200} />
            <span>{name}</span>
            <div>
                <span>{desc}</span>
                <span>{price}</span>
            </div>
            <button onClick={deleteItem}>delete</button>
            <button onClick={editItem}>edit</button>
        </div>
    )
}

export default FoodCard