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
    para: "",
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

  const handleclick = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", newnote.title);
    formData.append("tag", newnote.tag);
    formData.append("description", newnote.description);
    formData.append("para", newnote.para);
    if (file) {
      formData.append("photo", file);
    }

    addnote(formData);
  };

  return (
    <>
      {alert && <Alert message="This is deleted" />}
      <div className="flex justify-center align-middle md:m-24 flex-col">
        <div>
          <h1 className="my-5 text-center text-3xl text-pretty text-fuchsia-950">
            Create your content here
          </h1>
        </div>
        <div className="block">
          <form className="form">
            <div className="flex flex-col p-2 gap-4">
              <input
                name="title"
                type="text"
                placeholder="title"
                onChange={onchange}
                className="input focus:outline-none bordered input-bordered w-full"
              />
              <input
                name="tag"
                type="text"
                placeholder="tag"
                onChange={onchange}
                className="input focus:outline-none bordered input-bordered w-full"
              />
              <input
                name="description"
                type="text"
                placeholder="summary"
                onChange={onchange}
                className="input focus:outline-none bordered input-bordered w-full"
              />
              <input
                name="photo"
                type="file"
                onChange={handleFileChange}
                className="file-input text-md file-input-bordered w-full"
              />
              <ReactQuill value={newnote.para} onChange={handleQuillChange} />
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
