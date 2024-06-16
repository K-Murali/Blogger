import React, { useContext } from "react";

import { noteContext } from "../context/notes/NoteState";

const Alert = () => {
  const { message } = useContext(noteContext);
  return (
    <div
      className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <span className=" w-full  inline-flex">{message}</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
    </div>
  );
};

export default Alert;
