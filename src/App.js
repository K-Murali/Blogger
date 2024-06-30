import React from "react";
import NoteState from "./context/notes/NoteState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import Formnote from "./components/Formnote";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Social from "./components/Social";
import Loader from "./components/Loader";
import Readmore from "./components/Readmore";
import Userprofile from "./components/Userprofile";

const App = () => {
  return (
    <>
      <NoteState>
        <Router>
          <div className="  w-auto flex  flex-col  justify-center ">
            <Navbar />
            <Loader />
            <Routes>
              <Route exact path="/mynotes" element={<Feed />} />
              <Route exact path="/myprofile" element={<Userprofile />} />
              <Route exact path="/readmore" element={<Readmore />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/addnotes" element={<Formnote />} />
              <Route exact path="/Blogger" element={<Social />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
};

export default App;
