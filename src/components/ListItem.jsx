import React, {useState} from 'react'
import { FaArrowUp, FaArrowDown, FaExchangeAlt, FaArrowRight, FaTrash, FaEdit } from 'react-icons/fa';



export default function ListItem({num, img, name, subname, cover, swapItemsCallback
    , moveItemCallback , selected, setSelectedCallback, id, deleteItemCallback, setCurrentOverlayCallback
}) {

  let cover_style_obj = {"objectFit": (cover ? "cover" : "contain")}

  function handleSwapTo(event){
    if (event.key == "Enter"){
        swapItemsCallback(Number(event.target.value-1), num-1)
        event.target.value = undefined
    }
  }
  function handleMoveTo(event){
    if (event.key == "Enter"){
        moveItemCallback(num-1, Number(event.target.value)-1)
        event.target.value = ""
    }
  }

  function handleDelete(event){
    if (selected.id == id) {setSelectedCallback({})}
    deleteItemCallback(num-1);
    event.stopPropagation()
  }

  function handleEdit(event){
    setCurrentOverlayCallback({name: "editMenu", 
    data: {num: num, name: name, imgUrl: img, subname: subname}})
    event.stopPropagation();
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
          <img src={img ? img: "src/assets/fallback.jpg"} style={cover_style_obj}
          onError={(e) => {
            e.target.src = "src/assets/fallback.png"
          }  }>
          </img>
        </div>
        
        <div className='ListItemNum'>{num}.</div>
        
        <div className='ListItemDoubleContainer' style = {{flexGrow:1, flexShrink:1}}>
            <div className='ListItemName'>{name}</div>
            <div className='listItemSubName'>{subname}</div>
        </div>

        <div className='ListItemDoubleContainer closer textContainer removable'>
            <div>Move:</div> 
            <div>Swap:</div> 
        </div>

        <div className='ListItemDoubleContainer removable'>
            <input type="number" onKeyDown={handleMoveTo} onClick={stopChildPropigation}></input>
            <input type="number" onKeyDown={handleSwapTo} onClick={stopChildPropigation}></input>
        </div>

        <div className='ListItemDoubleContainer'>
            <button onClick = {(event) => {event.stopPropagation(); swapItemsCallback(num-1,num-2)}}>
              <FaArrowUp />
            </button>
            <button onClick={
              (event) => {if (selected.id){
                event.stopPropagation()
                swapItemsCallback(num-1,selected.num-1)
                setSelectedCallback({})
              }}
            }>
              <FaExchangeAlt />
            </button>
            <button onClick = {(event) => {event.stopPropagation(); swapItemsCallback(num-1,num)}}>
              <FaArrowDown />
            </button>
        </div>

        <div className='ListItemDoubleContainer'>
            
            <button onClick={handleDelete}><FaTrash /></button>
            <button><FaEdit onClick = {handleEdit}/></button>
        </div>
        
    </div>
  )
}

