import React from 'react'
import { Tooltip } from 'react-tooltip'

export default function NavbarButton({name = "", func, tooltip="", icon: Icon}) {

  return (
    <>
      <button className='NavBarButton'
      {...(tooltip && { 'data-tooltip-id': name + "-navbar-tooltip" })}
      {...(func && {"onClick": func})}
      > 
        {Icon && <Icon  />}
      </button>
      {tooltip && <Tooltip id={name+"-navbar-tooltip"} place = "right" content={tooltip} delayShow={1000} /> }
    </> 
  )
}
