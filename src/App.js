import React from "react";
import NoteState from "./context/notes/NoteState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import Formnote from "./components/Formnote";
import Signup from "./components/Signup";

const App = () => {
  
  return (
    <>
      <NoteState>
        <Router>
          <div className="  w-auto flex  flex-col  justify-center ">
            <Navbar />
            <Routes>
              <Route exact path="/mynotes" element={<Feed />} />
              <Route exact path="/addnotes" element={<Formnote />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
};

export default App;
