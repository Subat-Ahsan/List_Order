import React, {useRef, useState} from 'react'

export default function ImportListMenu({closeCallback , addItemCallback,setListCallback}) {
    const [errorMessage, setErrorMessage] = useState("");
    const fileRef = useRef(null);
    const overwriteRef = useRef(null)
    const reader = new FileReader();
    function close(){
        reader.abort()
        closeCallback({name: "", data: {}})
    }
    function addItems(){
        setErrorMessage("")
        if (!fileRef.current){
            close();
            return;
        }
        if (fileRef.current.files.length == 0){
            setErrorMessage("No files selected")
            return;
        }
        let currentFile = fileRef.current.files[0]
        if (currentFile.type !== "application/json"){
            setErrorMessage("Must be JSON input")
            return;
        }
        

        reader.onload = (e) =>{
            let jsonData = JSON.parse(e.target.result)
            try {
                if (overwriteRef.current && overwriteRef.current.checked){
                    setListCallback([])
                }
                for (const ob of jsonData){
                    addItemCallback(ob.name, ob.subname, ob.img, ob.cover)
                }}

              catch (error){
                console.log(error)
                setErrorMessage("Cannot parse JSON")
                return;
            }
            fileRef.current.value = '';
            setErrorMessage("")
        }
        reader.onerror = (e) => {
            setErrorMessage("Cannot read file")
        }
        setErrorMessage("Loading...")
        reader.readAsText(currentFile);
    }
  return (
    <div className ="overlay">
        <div className = "popup">
            <div className ="popupGrid">
                <span>Import File</span>
                <input type="file" ref = {fileRef}/>
                <span>Overwrite List:</span>
                <div className='popup-center'>
                    <span>
                        <input type="radio" name="override" value = "true" ref={overwriteRef}  />Yes &nbsp; &nbsp;
                    </span>
                    < span>
                        <input type="radio" name="override" value= "false" defaultChecked />No
                    </span>
                </div>
                <span className='grid-column-span-2 popup-center'>{errorMessage}</span >
                <div className='grid-column-span-2 popup-center'>
                    <button className='popupCloseButton' onClick={close}>Close</button>
                    <button className='popupAddButton' onClick={addItems}>Add</button>
                </div>
            </div>
        </div>
    </div>
  )
}
