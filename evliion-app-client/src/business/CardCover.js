import React from 'react'
import './CardCover.css'


function CardCover({url}) {
    return (
        <img className='card-cover' alt="business-image" src={url} />
    )
}

export default CardCover

