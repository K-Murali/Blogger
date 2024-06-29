import React, { useState, useContext, useEffect } from "react";
import { noteContext } from "../context/notes/NoteState";
import Alert from "./Alert";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Formnote = () => {
  const [file, setFile] = useState(null);
  const [newnote, setNewnote] = useState({
    title: "",
    tag: "",
    description: "",
    price: "",
    location: "",
    photo: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const { alert, setalert, addnote, flag, getnote } = useContext(noteContext);

  // useEffect(() => {
  //   getnote();
  // }, [flag]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setalert(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, [alert, setalert]);

  const validateForm = () => {
    const { title, tag, description, para } = newnote;
    if (title && tag && description && para && file) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const onchange = (e) => {
    setNewnote({ ...newnote, [e.target.name]: e.target.value });
    validateForm();
  };

  const handleQuillChange = (value) => {
    setNewnote({ ...newnote, para: value });
    validateForm();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    validateForm();
  };

  const handleclick = async (e) => {
    e.preventDefault();
    const cloudinary = new FormData();
    cloudinary.append("file", file);
    cloudinary.append("upload_preset", "natours");
    cloudinary.append("cloud_name", "drfvhp1jh");

    const formData = new FormData();

    // formData.append("title", newnote.title);
    // formData.append("tag", newnote.tag);
    // formData.append("description", newnote.description);
    // formData.append("para", newnote.para);
    // if (file) {
    //   formData.append("photo", file);
    //   console.log(file);
    // }

    const options = {
      method: "POST",
      body: cloudinary,
    };
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/drfvhp1jh/image/upload`,
      options
    );
    const ans = await res.json();

    newnote.photo = ans.url.split("upload/")[1];
    addnote(newnote);
  };

  return (
    <>
      {alert && <Alert message="This is deleted" />}
      <div className="flex justify-center align-middle md:m-14 flex-col">
        <div>
          <h1 className="my-5 text-center text-3xl text-pretty ">
            Create your content here
          </h1>
        </div>
        <div className="block">
          <form className="form">
            <div className="flex flex-col p-2 gap-4">
              <input
                name="title"
                type="text"
                placeholder="title... ( name of the place or trip )"
                onChange={onchange}
                className="input focus:outline-none bordered input-bordered w-full"
              />
              <input
                name="tag"
                type="text"
                placeholder="tag...  ( ex : hillstations ,mountains ,coolplaces ,temples ,old... )"
                onChange={onchange}
                className="input focus:outline-none bordered input-bordered w-full"
              />
              <input
                name="location"
                type="text"
                placeholder="location...  ( please enter the state name )"
                onChange={onchange}
                className="input focus:outline-none bordered input-bordered w-full"
              />
              <input
                name="price"
                type="number"
                placeholder="Budget...  ( estimated expenses )"
                onChange={onchange}
                className="input focus:outline-none bordered input-bordered w-full"
              />
              <textarea
                name="description"
                rows="3"
                placeholder="summary ... ( briefly about the experience )"
                onChange={onchange}
                className="input focus:outline-none bordered input-bordered w-full"
              ></textarea>

              <input
                name="photo"
                type="file"
                onChange={handleFileChange}
                className="file-input text-md file-input-bordered w-full"
              />
              {/* <ReactQuill value={newnote.para} onChange={handleQuillChange} /> */}
              <button
                type="submit"
                onClick={handleclick}
                className="btn btn-outline btn-success"
              >
                Create post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Formnote;
