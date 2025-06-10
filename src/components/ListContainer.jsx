import React , {useState} from 'react'
import ListItem from './ListItem'
import ListGap from './ListGap'
import EditableText from './EditableText'

export default function ListContainer({itemList, swapItemsCallback, moveItemCallback,
   deleteItemCallback, setCurrentOverlayCallback, editItemCallback, title, editTitleCallback}) {
  
  
  const [selected, setSelected] = useState({})

  function resetSelected(){
    setSelected({})
  }
  
  function addToLocation(num){
    setCurrentOverlayCallback({name: "addItemMenu", data: {initialPos: num+1}})
  }

  return (
    <div className="ListContainerDiv" onClick={resetSelected}>
        <EditableText param={title} editParam={editTitleCallback} 
        className={"editableText "} style = {{fontSize: "2rem"}}></EditableText>
        <ListGap selected={selected} num = {0}  moveCallback={moveItemCallback}
        key = {200000 + 0} menuCallback={addToLocation} />
        {itemList.map((item,index)=> (
            
            [<ListItem key={item.id} num = {item.num} img = {item.img} cover={item.cover}
            name = {item.name} subname = {item.subname} swapItemsCallback = {swapItemsCallback}
            moveItemCallback = {moveItemCallback} id = {item.id} deleteItemCallback = {deleteItemCallback}
            selected= {selected} setSelectedCallback = {setSelected} setCurrentOverlayCallback = {setCurrentOverlayCallback}
            />,
            <ListGap selected={selected} num={index+1} 
            moveCallback={moveItemCallback} key= {200000 + index+1} menuCallback={addToLocation}/>
            ]
            ))
        }
    </div>
  )
}
