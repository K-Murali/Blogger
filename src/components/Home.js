import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { noteContext } from "../context/notes/NoteState";
const Home = () => {
  const { loginflag } = useContext(noteContext);
  return (
    <div>
      {loginflag ? (
        <div>
          <h1>Home</h1>
        </div>
      ) : (
        <div className=" font-thin mt-10 text-4xl  flex justify-center  text-zinc-600">
          <button className="btn btn-active btn-ghost">
            <Link to="/signup">Please login</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
