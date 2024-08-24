import { useState,useRef, useEffect } from 'react'
import 'react-tooltip/dist/react-tooltip.css'
import './List.css'
import './Navbar.css'
import './popup.css'
import './App.css'
import ListContainer from './components/ListContainer'
import NavBar from './components/NavBar'
import AddItemMenu from './components/AddItemMenu'
import EditItemMenu from './components/EditItemMenu'

const inital = [{num:1, name: "A", subname: "Fest"},
  {num:2, name: "B", subname: "Fest"},
  {num:3, name: "C", subname: "E"},
  {num:4, name: "D", subname: "D"},
  {num:5, name: "E", subname: ""},
  {num:6, name: "F", subname: ""},
  {num:7, name: "G", subname: "",},
  {num:8, name: "H", subname: "", img:""},]

function App() {
  const [itemList, setItemList] = useState([])
  const items_key_info = useRef({cur_val: 1 , freed: []})
  const [currentOverlay, setCurrentOverlay] = useState({name: "", data: {}})

  function addItem(name = "", subName = "", imgUrl = "", cover = false, initalPos=-1){
    if (name == "" && imgUrl == ""){
      return;
    }
    setItemList(oldList => {
      let newList = [...oldList];
      let freedLength = items_key_info.current.freed.length
      let newId = freedLength > 0 ? items_key_info.current.freed[freedLength-1] :
      items_key_info.current.cur_val;
      if (typeof(initalPos)=="number" && initalPos >= 0 && initalPos < newList.length){
        newList.splice(initalPos, 0, {num:oldList.length + 1, name: name,
          subname: subName, ...(imgUrl && {img:imgUrl}),
          cover: cover, id: newId});
        
          for (let i = initalPos; i<newList.length; i++){
            newList[i].num = (i+1)
          }

        freedLength > 0 ? items_key_info.current.freed.pop() : items_key_info.current.cur_val += 1;
      } else{
        newList.push({num:oldList.length + 1, name: name,
          subname: subName, ...(imgUrl && {img:imgUrl}),
          cover: cover, id: newId});
        
        freedLength > 0 ? items_key_info.current.freed.pop() : items_key_info.current.cur_val += 1;
      }
      return newList;
    })
  }
  
  function deleteItem(ind){
    if (ind == undefined || typeof(ind) != "number" || ind < 0 || ind > itemList.length){
      return
    }
    setItemList(oldList => {
      let newList = [...oldList];
      let [outPutVal] = newList.splice(ind, 1);
      for (let i = ind; i<newList.length; i++){
        newList[i].num = (i+1)
      }
      items_key_info.current.freed.push(outPutVal.id);
      return newList;
    })
  }

  function editItem(name ="", subName="", imgUrl = "", cover = false, index){
    if (name == "" && imgUrl == ""){
      return;
    }

    setItemList(oldList => {
      let newList = [...oldList];
      newList[index].name = name;
      newList[index].subname = subName;
      
      (imgUrl != "") ? newList[index].img = imgUrl : null;
      newList[index].cover = cover;
      console.log(newList)
      return newList;
    })
  }
  
  useEffect( () =>{
    items_key_info.current.cur_val = 1;
    setItemList([])
    for (const ob of inital){
      addItem(ob.name, ob.subname, ob.img, ob.cover)
    }
  }, [])

  function SwapItems(i1, i2){
    if (i1 == undefined || i2 == undefined){
      return
    }
    if (!(typeof(i1) === "number" && typeof(i2) === "number")){
      return;
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
    if (!(typeof(from) === "number" && typeof(to) === "number")){
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
        newVal[i].num = (i+1) 
      }
      return newVal;
    })
  }

  return (
    <div className='AppContainer'>
      {currentOverlay.name=="addItemMenu" && <AddItemMenu closeCallback = {setCurrentOverlay}
      addItemCallback = {addItem}> </AddItemMenu>}
      
      {currentOverlay.name == "editMenu" && 
      <EditItemMenu closeCallback = {setCurrentOverlay} 
      data={currentOverlay.data} editItemCallback={editItem}/>}

      <NavBar addMenuOnCallback = {setCurrentOverlay}></NavBar>
      <ListContainer itemList = {itemList} swapItemsCallback = {SwapItems} 
      moveItemCallback = {moveItem} deleteItemCallback = {deleteItem} 
      setCurrentOverlayCallback = {setCurrentOverlay} />
    </div>
  )
}  

export default App
