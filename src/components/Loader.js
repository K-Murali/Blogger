import React from "react";
import { useContext, useState } from "react";
import { noteContext } from "../context/notes/NoteState";
import LoadingBar from "react-top-loading-bar";

const Loader = () => {
  const { loadval, setloadval } = useContext(noteContext);
  return (
    <LoadingBar
      color="#f11946"
      progress={loadval}
      onLoaderFinished={() => setloadval(0)}
    />
  );
};

export default Loader;
