import React from "react";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { noteContext } from "../context/notes/NoteState";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const naviagte = useNavigate();
  const { auth, getallnotes } = useContext(noteContext);

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Full viewport height
  };

  const handlebooking = async () => {
    const query = window.location.href.split("?")[1]
      ? window.location.href.split("?")[1]
      : null;
    await getallnotes(query);
    naviagte("/Blogger");
  };
  useEffect(() => {
    handlebooking();
  }, []);

  return (
    <div style={containerStyle}>
      {auth.length > 0 ? (
        <div className="font-thin text-4xl text-zinc-600">
          <button className="btn btn-active btn-ghost">
            <Link className="text-2xl" to="/addnotes">
              Write your Blog here...
            </Link>
          </button>
        </div>
      ) : (
        <div className="font-thin text-4xl text-zinc-600">
          <button className="btn btn-active btn-ghost">
            <Link className="text-2xl" to="/signup">
              U can like and comment only if you login...
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
