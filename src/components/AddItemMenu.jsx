
import React, {useRef} from 'react'

export default function AddItemMenu({closeCallback, itemList, itemListCallback
    , moveItemCallback, key_info
}) {

    const nameRef = useRef(null);
    const subNameRef = useRef(null);
    const initalPosRef = useRef(null);
    const imageUrlRef = useRef(null);
    const coverRef = useRef(null);

    function close(){
        closeCallback(false)
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
        itemListCallback(oldVal  => {
            let newVal = [...oldVal, {num:oldVal.length + 1, name: nameVal,
                subname: subNameVal, ...(imgUrlVal && {img:imgUrlVal}),
                cover: coverVal, id: key_info.current.cur_val
            }]
            key_info.current.cur_val += 1
            return newVal
        })

        if (nameRef.current) {nameRef.current.value = '';}
        if (subNameRef.current) {subNameRef.current.value = '';}
        if (initalPosRef.current) {initalPosRef.current.value = '';}
        if (imageUrlRef.current) {imageUrlRef.current.value = '';}

    }
  return (
    <>
    <div className ="overlay">
        <div className = "addItemMenu">
            <div className ="addItemGrid">
                <span>Name:</span>
                <input type="text" ref = {nameRef} className='grid-column-span-2' required />
                <span >Sub Name:</span>
                <input type= "text" ref={subNameRef} className='grid-column-span-2' /> 
                <span >Initial Position:</span>
                <input type= "text" ref = {initalPosRef} className='grid-column-span-2' /> 
                <span >Image URL:</span>
                <input type="text" ref = {imageUrlRef} className='grid-column-span-2' />
                <span>Image Fit:</span>
                <div className='grid-column-span-2'>
                    <span>
                        <input type="radio" name="image-fit" value = "cover" ref={coverRef}   />Crop &nbsp; &nbsp;
                    </span>
                    < span>
                        <input type="radio" name="image-fit" value="fit" defaultChecked />Fit
                    </span>
                </div>
                <div className='grid-column-span-3'>
                    <button className='addMenuCloseButton' onClick={close}>Close</button>
                    <button className='addMenuAddButton' onClick={addItem}>Add</button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
