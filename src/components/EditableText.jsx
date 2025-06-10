import {React, useState, useEffect} from 'react'

export default function EditableText({param, editParam, className, style}) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(param);

  useEffect(() => {
    setValue(param);
  }, [param]);

  const handleClick = () => {
    setEditing(true); 
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    setEditing(false); 
    
    if (value === ""){
      setValue("Untitled");
      editParam("Untitled");
    } else{
      editParam(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur(); 
    }
  };

  return editing ? 
  <input 
    type="text"
    value={value}
    onChange={handleChange}
    onBlur={handleBlur}
    onKeyDown={handleKeyDown}
    autoFocus
    className={className}
    style={style}
  ></input> 
  : <span className={className} style={style}  onClick={handleClick} >{param}</span>  
  
}
