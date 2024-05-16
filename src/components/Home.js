import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { noteContext } from "../context/notes/NoteState";

const Home = () => {
  const { auth } = useContext(noteContext);

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Full viewport height
  };

  return (
    <div style={containerStyle}>
      {auth.length>0 ? (
        <div className="font-thin text-4xl text-zinc-600">
          <button className="btn btn-active btn-ghost">
            <Link className="text-2xl" to="/addnotes">
              write your Blog here...
            </Link>
          </button>
        </div>
      ) : (
        <div className="font-thin text-4xl text-zinc-600">
          <button className="btn btn-active btn-ghost">
            <Link className="text-2xl" to="/signup">
              Please login
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
