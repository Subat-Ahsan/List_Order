import React, {useState, useRef} from 'react'
import { FaPlus, FaSave, FaFileExport, FaFileImport, FaFilePdf } from 'react-icons/fa';
import { jsPDF } from "jspdf";

import NavbarButton from './NavbarButton';

function urlToBase64(url, dimx = 760, dimy = 760) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; 
    img.src = url;

    img.onload = () => {

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      let initalw = img.width;
      let initalh = img.height;
      let aspectRatio = img.width / img.height;

      canvas.width = dimx;
      canvas.height = dimy;

      let w = 0;
      let h = 0;
      let shiftr = 0;
      let shiftd = 0;

      if (initalw > initalh) {
        w = dimx;
        h = dimy / aspectRatio;
        shiftd = (dimy - h) / 2;
      } else {
        h = dimy;
        w = dimx * aspectRatio;
        shiftr = (dimx - w) / 2;
      }

      ctx.drawImage(img, shiftr, shiftd, w, h);

      const base64Image = canvas.toDataURL('image/jpeg');
      resolve(base64Image); 
    };

    img.onerror = (error) => {
      reject(error); 
    };
  });
}

export default function NavBar({MenuOnCallback, itemList}) {
  const [navbarMessage, setNavBarMessage] = useState("")
  const pdfRef = useRef(null);

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

  async function exportToPdf(){
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: "letter"
    });
  
    const backgroundColor = [40, 43, 43]; 
    const itemColor = [48, 48, 53]
    
    let curx = 0;
    let cury = 0.099;
    doc.setFillColor(...backgroundColor);
    doc.rect(0, 0, 8.5, 11, 'F');
    for (let index = 0; index<itemList.length; index++){
      if (index % 10 == 0 && index != 0){
        cury =  0.099;
        doc.addPage("letter")
        doc.setFillColor(...backgroundColor);
        doc.rect(0, 0, 8.5, 11, 'F');
      }
      const obj = itemList[index]
      doc.setFillColor(...itemColor);
      doc.rect(0.2, cury, 8.1, 1, 'F');
      const imageUrl = obj.img
      
      try {
        const base64Image = await urlToBase64(imageUrl)
        doc.addImage(base64Image, 'JPEG', 0.2, cury, 1, 1);
      } catch (error) {
        
      }

      doc.setTextColor(250, 250, 250)
      doc.setFontSize(36)
      doc.text(`${obj.num}.`, 1.3, cury+0.7)

      doc.setTextColor(230, 230, 230)
      doc.setFontSize(32)
      doc.text(`${obj.name}`, 3.1, cury+0.5)

      doc.setTextColor(100, 149, 237)
      doc.setFontSize(24)
      doc.text(`${obj.subname}`, 3.1, cury+0.9)
      cury += 1.099;
    }
    
    doc.save("list.pdf"); 
  }

  return (
    
    <div className='NavBar' >
        <NavbarButton name = "add_menu" icon = {FaPlus} func={addMenuOn} tooltip = "add item"></NavbarButton>
        <NavbarButton  name="save_local" icon = {FaSave} func={saveListLocal} tooltip='Save list'></NavbarButton>
        <NavbarButton  name="import_list" icon={FaFileImport} func={importMenuOn} tooltip='Import from File '></NavbarButton>
        <NavbarButton  name="export_list" icon = {FaFileExport} func = {exportListtoFile}
        tooltip = "Export to file"></NavbarButton>
        <NavbarButton  name="export_pdf" icon={FaFilePdf} func={exportToPdf} tooltip='Export to pdf'></NavbarButton>
        <p className = "navbarMessage">{navbarMessage}</p>
    </div>
    
    
  )
}
