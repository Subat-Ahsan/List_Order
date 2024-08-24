
import React, {useRef} from 'react'

export default function AddItemMenu({closeCallback, addItemCallback}) {
    const nameRef = useRef(null);
    const subNameRef = useRef(null);
    const initalPosRef = useRef(null);
    const imageUrlRef = useRef(null);
    const coverRef = useRef(null);

    function close(){
        closeCallback({name: "", data: {}})
    }

    function addItem(){
        let nameVal = (nameRef.current ? nameRef.current.value : "");
        let subNameVal = subNameRef.current ? subNameRef.current.value : "";
        let initalPosVal = initalPosRef.current ? initalPosRef.current.value : "";
        let imgUrlVal = imageUrlRef.current ? imageUrlRef.current.value : "";
        let coverVal = coverRef.current ? coverRef.current.checked : false;
        
        if (nameVal == "" && imgUrlVal == ""){
            return;
        }

        initalPosVal = (initalPosVal === "" || isNaN(initalPosVal)) ? -1 : 
        Number(initalPosVal) - 1; 
        addItemCallback(nameVal, subNameVal, imgUrlVal, coverVal,initalPosVal);

        if (nameRef.current) {nameRef.current.value = '';}
        if (subNameRef.current) {subNameRef.current.value = '';}
        if (initalPosRef.current) {initalPosRef.current.value = '';}
        if (imageUrlRef.current) {imageUrlRef.current.value = '';}

    }
  return (
    <>
    <div className ="overlay">
        <div className = "popup">
            <div className ="popupGrid">
                <span>Name:</span>
                <input type="text" ref = {nameRef}  required />
                <span >Sub Name:</span>
                <input type= "text" ref={subNameRef}  /> 
                <span >Initial Position:</span>
                <input type= "text" ref = {initalPosRef}  /> 
                <span >Image URL:</span>
                <input type="text" ref = {imageUrlRef}  />
                <span>Image Fit:</span>
                <div className='popup-center'>
                    <span>
                        <input type="radio" name="image-fit" value = "cover" ref={coverRef}   />Crop &nbsp; &nbsp;
                    </span>
                    < span>
                        <input type="radio" name="image-fit" value="fit" defaultChecked />Fit
                    </span>
                </div>
                <div className='grid-column-span-2 popup-center'>
                    <button className='popupCloseButton' onClick={close}>Close</button>
                    <button className='popupAddButton' onClick={addItem}>Add</button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
