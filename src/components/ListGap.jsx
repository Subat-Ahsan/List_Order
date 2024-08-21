import React from 'react'
import { FaChevronLeft} from 'react-icons/fa';

export default function ListGap({selected, moveCallback, num}) {
    function handleClick(){
        if (selected.id != undefined){
            moveCallback(selected.num-1, num);
        }
        
    }
    return (
    <div className={`listGap ${selected.id != undefined ? "selected" : ""}`}>
        {selected.id != undefined && 
        <button onClick={handleClick} className='listGapMove'><FaChevronLeft /></button>}
    </div>
  )
}
