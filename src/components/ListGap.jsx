import React from 'react'
import { FaChevronLeft} from 'react-icons/fa';

export default function ListGap({selected, moveCallback, num, menuCallback}) {
    function handleClick(){
        if (selected.id != undefined){
            moveCallback(selected.num-1, num);
        } else{
            menuCallback(num)
        }
    }
    return (
    <button className={`listGap ${selected.id != undefined ? "selected" : ""}`}
        onClick = {handleClick}>
        {!selected.id  ? "+" : "⇅"}
    </button>
  )
}
