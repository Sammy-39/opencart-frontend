import React from 'react'

import '../styles/rating.css'

const Rating = ({value,text}) => {
    return (
        <div className='rating'>
            {
                value && 
                <>
                { Array(parseInt(value)).fill().map((_,idx)=>( 
                    <i className="material-icons filled" key={idx}> star </i> 
                  ))}
                { parseInt(value)!==value ? <i className="material-icons filled"> star_half </i>:'' }
               </>
            }
            <span> {text && text} </span>
        </div>
    )
}

export default Rating
