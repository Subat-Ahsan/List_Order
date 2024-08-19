import React, {useState} from 'react'



export default function ListItem({num, img, name, subname, swapItemsCallback
    , moveItemCallback , selected, setSelectedCallback, id
}) {


  function handleSwapTo(event){
    if (event.key == "Enter"){
        swapItemsCallback(event.target.value-1, num-1)
        event.target.value = undefined
    }
  }
  function handleMoveTo(event){
    if (event.key == "Enter"){
        moveItemCallback(num-1, event.target.value-1)
        event.target.value = ""
    }
  }

  function selectItem(event){
    setSelectedCallback({id: id, num: num});
    event.stopPropagation()
  }

  function stopChildPropigation(event){
    event.stopPropagation()
  }

  return (
    <div className = {`listItemDiv ${selected.id == id ? `selected` : ""}`} onClick={selectItem}>
        <div className='ListItemImageContainer'>
          <img src={img}></img>
        </div>
        
        <div className='ListItemNum'>{num}.</div>
        
        <div className='ListItemDoubleContainer' style = {{flexGrow:1}}>
            <div className='ListItemName'>{name}</div>
            <div className='listItemSubName'>{subname}</div>
        </div>

        <div className='ListItemDoubleContainer closer'>
            <div>Move:</div> 
            <div>Swap:</div> 
        </div>

        <div className='ListItemDoubleContainer'>
            <input type="number" onKeyDown={handleMoveTo} onClick={stopChildPropigation}></input>
            <input type="number" onKeyDown={handleSwapTo} onClick={stopChildPropigation}></input>
        </div>

        <div className='ListItemDoubleContainer'>
            <button onClick = {(event) => {event.stopPropagation(); swapItemsCallback(num-1,num-2)}}>
            ^</button>
            <button onClick={
              (event) => {if (selected.id){
                event.stopPropagation()
                swapItemsCallback(num-1,selected.num-1)
                setSelectedCallback({})
              }}
            }>&#8635;</button>
            <button onClick = {(event) => {event.stopPropagation(); swapItemsCallback(num-1,num)}}>
            v</button>
        </div>

        <div className='ListItemDoubleContainer'>
            <button>&#8594;</button>
            <button>Del</button>
            <button>...</button>
        </div>
        
    </div>
  )
}

