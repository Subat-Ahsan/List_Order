import React, {useRef, useEffect} from 'react'

export default function EditItemMenu({closeCallback, data, editItemCallback, 
}) {
    function close(){
        closeCallback("")
    }

    const nameRef = useRef(null);
    const subNameRef = useRef(null);
    const imageUrlRef = useRef(null);
    const coverRef = useRef(null);

    useEffect( () => {
        if (!data){close();}

        nameRef.current.value = data.name;
        subNameRef.current.value = data.subname;
        imageUrlRef.current.val = data.imgUrl;
    }, [data])

    function handleEdit(){
        editItemCallback(nameRef.current.value, subNameRef.current.value, 
            imageUrlRef.current.value,coverRef.current.checked, data.num-1)
    }
    return (
    <div className ="overlay">
        <div className = "popup">
            <div className ="popupGrid">
                <span>Name:</span>
                <input type="text" ref = {nameRef}  required />
                <span >Sub Name:</span>
                <input type= "text" ref={subNameRef}  /> 
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
                    <button className='popupAddButton' onClick={handleEdit} >Save</button>
                </div>
            </div>
        </div>
    </div>
  )
}
