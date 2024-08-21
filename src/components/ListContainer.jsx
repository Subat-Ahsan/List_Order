import React , {useState} from 'react'
import ListItem from './ListItem'
import ListGap from './ListGap'

export default function ListContainer({itemList, swapItemsCallback, moveItemCallback}) {
  
  
  const [selected, setSelected] = useState({})

  function resetSelected(){
    setSelected({})
  }

  return (
    <div className="ListContainerDiv" onClick={resetSelected}>
        <ListGap selected={selected} num = {0}  moveCallback={moveItemCallback}
        key = {200000 + 0} />
        {itemList.map((item,index)=> (
            
            [<ListItem key={item.id} num = {item.num} img = {item.img} cover={item.cover}
            name = {item.name} subname = {item.subname} swapItemsCallback = {swapItemsCallback}
            moveItemCallback = {moveItemCallback} id = {item.id}
            selected= {selected} setSelectedCallback = {setSelected}
            />,
            <ListGap selected={selected} num={index+1} 
            moveCallback={moveItemCallback} key= {200000 + index+1}/>
            ]
            ))
        }
    </div>
  )
}
