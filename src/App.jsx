import { useState,useRef, useEffect } from 'react'
import 'react-tooltip/dist/react-tooltip.css'
import './List.css'
import './Navbar.css'
import './AddMenu.css'
import './App.css'
import ListContainer from './components/ListContainer'
import NavBar from './components/NavBar'
import AddItemMenu from './components/AddItemMenu'

const inital = [{num:1, name: "A", subname: "Fest"},
  {num:2, name: "B", subname: "Fest"},
  {num:3, name: "C", subname: "E"},
  {num:4, name: "D", subname: "D"},
  {num:5, name: "E", subname: ""},
  {num:6, name: "F", subname: ""},
  {num:7, name: "G", subname: "",},
  {num:8, name: "H", subname: "", img:"https://upload.wikimedia.org/wikipedia/en/b/b5/Megumin_anime.png"},]

function App() {
  const [itemList, setItemList] = useState([])
  const items_key_info = useRef({cur_val: 1 , freed: []})

  //handle inital loading
  useEffect( () =>{
    let newArr = [];
    items_key_info.current.cur_val = 1;
    for (const ob of inital){
      newArr.push({...ob , id: items_key_info.current.cur_val})
      items_key_info.current.cur_val+= 1
    }
    setItemList(newArr)
  }, [])

  const [addItemMenuOn, setAddItemMenuOn] = useState(false)

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
    <div className='AppContainer'>
      {addItemMenuOn && <AddItemMenu closeCallback = {setAddItemMenuOn}
      itemList = {itemList} itemListCallback = {setItemList}
      moveItemCallback = {moveItem} key_info = {items_key_info}> </AddItemMenu>}
      
      <NavBar addMenuOnCallback = {setAddItemMenuOn}></NavBar>
      <ListContainer itemList = {itemList} swapItemsCallback = {SwapItems} 
      moveItemCallback = {moveItem}
      />
    </div>
  )
}  

export default App
