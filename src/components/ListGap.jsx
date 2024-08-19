import React from 'react'

export default function ListGap({selected, moveCallback, num}) {
    function handleClick(){
        if (selected.id != undefined){
            moveCallback(selected.num-1, num);
        }
        
    }
    return (
    <div className={`listGap ${selected.id != undefined ? "selected" : ""}`}
    onClick={handleClick}>
        {selected.id != undefined ? "Move" : ""}
    </div>
  )
}
