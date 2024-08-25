import React, {useState} from 'react'
import { FaPlus, FaSave, FaFileExport, FaFileImport } from 'react-icons/fa';

import NavbarButton from './NavbarButton';
import { jsx } from 'react/jsx-runtime';

export default function NavBar({MenuOnCallback, itemList}) {
  const [navbarMessage, setNavBarMessage] = useState("")
  function addMenuOn() {
    MenuOnCallback({name: "addItemMenu", data:{}});
  }

  function importMenuOn(){
    MenuOnCallback({name: "importList", data:{}});
  }

  function saveListLocal(){
    const listJson = [];
    
    for (let ob of itemList){
      let newOb = {...ob}
      delete newOb.id
      listJson.push(newOb)
    }

    localStorage.setItem("List", JSON.stringify(listJson));
    setNavBarMessage("Saved Successfully")
    setTimeout(() => {setNavBarMessage("")},1000)
  }
  function exportListtoFile(){
    const listJson = [];
    
    for (let ob of itemList){
      let newOb = {...ob}
      delete newOb.id
      listJson.push(newOb)
    }

    const jsonString = JSON.stringify(listJson, null, 2)
    const blob = new Blob([jsonString], {type: 'application/json'})
    const link = document.createElement('a')
    link.download = "list.json"
    link.href = URL.createObjectURL(blob)
    link.style.display = "none"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className='NavBar'>
        <NavbarButton name = "add_menu" icon = {FaPlus} func={addMenuOn} tooltip = "add item"></NavbarButton>
        <NavbarButton  name="save_local" icon = {FaSave} func={saveListLocal} tooltip='Save list'></NavbarButton>
        <NavbarButton  name="import_list" icon={FaFileImport} func={importMenuOn} tooltip='Import from File '></NavbarButton>
        <NavbarButton  name="export_list" icon = {FaFileExport} func = {exportListtoFile}
        tooltip = "Export to file"></NavbarButton>
        <p className = "navbarMessage">{navbarMessage}</p>
    </div>
  )
}
