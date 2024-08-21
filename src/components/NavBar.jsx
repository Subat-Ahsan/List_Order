import React from 'react'
import { FaPlus, FaSave } from 'react-icons/fa';

import NavbarButton from './NavbarButton';

export default function NavBar({addMenuOnCallback}) {
  function addMenuOn() {
    addMenuOnCallback(true);
  }
  return (
    <div className='NavBar'>
        <NavbarButton name = "add_menu" icon = {FaPlus} func={addMenuOn} tooltip = "add item"></NavbarButton>
        <NavbarButton  ></NavbarButton>
        <NavbarButton   ></NavbarButton>
        <NavbarButton  ></NavbarButton>
        <NavbarButton   ></NavbarButton>
    </div>
  )
}
