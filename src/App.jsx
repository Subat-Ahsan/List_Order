import { useState } from 'react'

import './App.css'
import ListContainer from './components/ListContainer'

function App() {
  const [itemList, setItemList] = useState([
  {num:1, name: "A", subname: "Fest", id: 1},
  {num:2, name: "B", subname: "Fest", id:2},
  {num:3, name: "C", subname: "E", id:3},
  {num:4, name: "D", subname: "D", id:4},
  {num:5, name: "E", subname: "", id:5},
  {num:6, name: "E", subname: "", id:6},
  {num:8, name: "E", subname: "", id:7},
  {num:7, name: "E", subname: "", id:8},
  
  ])

  function SwapItems(i1, i2){
    if (i1 == undefined || i2 == undefined){
      return
    }
    if (i1 == i2 || i1 >= itemList.length || i2 >= itemList.length || i1 < 0 || i2 < 0){
      return;
    }
    setItemList(oldVal => {
      let newVal = [...oldVal]
      const temp = newVal[i1]
      newVal[i1] = newVal[i2]
      newVal[i2] = temp
      newVal[i1].num=i1+1
      newVal[i2].num = i2+1
      return newVal
    })}
  
  function moveItem(from, to){
    if (from == undefined || to == undefined){
      return;
    }
    if (from < 0 || from >= itemList.length ||  to < 0 || to>itemList.length){
      return 
    }
    setItemList((oldVal) => {
      let newVal = [...oldVal]
      const [item] = newVal.splice(from,1)
      const newTo = to>from ? to-1 : to
      newVal.splice(newTo, 0 , item)
      for (let i=0; i<newVal.length; i++){
        newVal[i].num = (i+1) + ''
      }
      return newVal;
    })
  }
  return (
    <>
      <ListContainer itemList = {itemList} swapItemsCallback = {SwapItems} 
      moveItemCallback = {moveItem}
      />
    </>
  )
}  

export default App
