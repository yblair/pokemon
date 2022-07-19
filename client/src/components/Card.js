import React from 'react';
import  '../styles/Card.css'

export default function Card({name, image}){
    return(
        <div className='card'>
            <h2 className='title_name'>{name}</h2>
            <div className='card_content'>
                <img src={image} className='card_image'/>
            </div>
        </div>
    )
}