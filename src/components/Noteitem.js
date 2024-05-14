import React, { useContext, useEffect, useState } from "react";
import { noteContext } from "../context/notes/NoteState";
import Modalbox from "./Modalbox";
import { AiFillDelete,  } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa"

const Noteitem = (props) => {

  const {deletenote,editnote} = useContext(noteContext);
  const [newnote,setnewnote] = useState({title:"",description:"",tag:""});

  const handledelete = () => {
    const b=confirm("Are you sure you want to delete?");
    if(!b){return false;}
    deletenote(props.id);
  }


  const handleclick = (e) => {
    e.preventDefault();
    
    document.getElementById(`my_modal_${props.id}`).showModal();
    // passing id is really important as you have to tell it which box it should open

  }
  const handleedit = (e) => {
    e.preventDefault();
    editnote(props.id, newnote.title, newnote.description, newnote.tag); 
  };
  
  const onchange=(e)=>{
    setnewnote({...newnote,[e.target.name]:e.target.value});
   }

 

  return  (
    <div className="flex items-center m-5 justify-center">
      <div className="card   w-screen bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title">{props.title}</h1>
          <p className="text-wrap ">{props.description}</p>
          <div className="card-actions flex justify-between  ">
          <div className="badge p-3 badge-accent">{props.tag}</div>

            <div className="">
              <button onClick={handledelete} className="   ml-2 rounded      w-fit  h-auto p-1 mb-5 from-zinc-50"><AiFillDelete  className=" text-2xl"/> </button>
              <button onClick={handleclick} className="  ml-2 rounded     w-fit  h-auto p-1 mb-5 from-zinc-50"> <FaRegEdit className=" text-2xl" /> </button>
              <dialog id={`my_modal_${props.id}`} className="modal">
             <Modalbox
             title={props.title}
             description={props.description}
             tag={props.tag}
             key={props.id}
             id={props.id}
             handleedit={handleedit}
             onchange={onchange}
             />
              </dialog>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;