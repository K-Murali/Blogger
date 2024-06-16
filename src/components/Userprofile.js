import React, { useEffect, useContext, useState } from "react";
import img from "./images/899048.png";
import { useNavigate } from "react-router-dom";
import { noteContext } from "../context/notes/NoteState";
import { IoImagesOutline } from "react-icons/io5";
import { FaArrowAltCircleRight, FaRegBookmark } from "react-icons/fa";
import Alert from "./Alert";

const Userprofile = () => {
  const navigate = useNavigate();
  const [newuser, setnewuser] = useState({
    name: "",
    email: "",
  });
  const [msg, setmsg] = useState("");
  const handlechange = (e) => {
    setnewuser({ ...newuser, [e.target.name]: e.target.value });
  };
  const handlesubmit = async (e) => {
    if (newuser.name.length > 0) localStorage.setItem("name", newuser.name);
    if (newuser.email.length > 0) localStorage.setItem("email", newuser.email);
    console.log(newuser);
    e.preventDefault();
    const res = await updateuser(newuser);
    setmsg(res.msg);
  };
  const { getuserbyid, user, setalert, alert, flag, updateuser } =
    useContext(noteContext);
  const [saved, setsaved] = useState(true);
  const [post, setpost] = useState(false);
  const [liked, setliked] = useState(false);

  setTimeout(() => {
    setalert(false);
  }, 9000);

  const handlesave = () => {
    setsaved(true);
    setliked(false);
    setpost(false);
  };
  const handlepost = () => {
    setpost(true);
    setliked(false);
    setsaved(false);
  };
  const handleliked = () => {
    setliked(true);
    setpost(false);
    setsaved(false);
  };

  const handle_image_click = async (id) => {
    await localStorage.setItem("id", id);
    navigate("/readmore");
  };

  useEffect(() => {
    getuserbyid();
  }, [flag]);

  return (
    user && (
      <>
        {alert && <Alert msg={msg} />}
        <div className="flex justify-center min-h-screen">
          <div className="flex justify-center items-center shadow-xl rounded-lg border-2 lg:m-5 lg:p-5 md:m-3 sm:m-1 flex-col w-[900px] h-auto">
            <h1 className="text-2xl  font-bold">Your Account</h1>
            <div className="flex flex-col md:flex-row justify-center items-center gap-2 w-full mt-10">
              <div className="flex p-3 items-center justify-between h-auto">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center lg:h-64 sm:h-fit rounded-lg cursor-pointer"
                >
                  <div className="flex flex-col justify-center items-center gap-4 pt-5 pb-6">
                    <img
                      className="border-2 border-black p-1 w-32 h-32 md:w-36 md:h-28 lg:w-44 lg:h-36 rounded-full mb-4"
                      src={img}
                      alt="User"
                    />
                    <div>
                      <p className="mb-2 text-sm underline text-center text-gray-500">
                        <span className="font-semibold hover:text-info">
                          Click to upload
                        </span>
                      </p>
                    </div>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
              <div className="flex flex-col w-full px-4">
                <input
                  name="name"
                  type="text"
                  onChange={handlechange}
                  defaultValue={localStorage.getItem("name")}
                  className="input w-full focus:outline-none input-bordered mb-2"
                />
                <input
                  name="email"
                  type="text"
                  onChange={handlechange}
                  defaultValue={localStorage.getItem("email")}
                  className="input w-full focus:outline-none input-bordered"
                />
                <button
                  onClick={handlesubmit}
                  className="p-2 hover:text-black hover:bg-gray-400 mt-5 w-fit text-sm bg-gray-600 text-white rounded"
                >
                  Update changes
                </button>
              </div>
            </div>
            <div className="border-2 w-full border-gray-300 my-5"></div>
            <div>
              <div className="flex gap-5 justify-around py-2">
                <div
                  onClick={handlepost}
                  className={`flex items-center py-2 ${
                    post ? "border-t-2 border-info" : ""
                  } cursor-pointer`}
                >
                  <span className="mr-1">
                    <IoImagesOutline className="w-5 h-5" />
                  </span>
                  <span>Posts</span>
                </div>
                <div
                  onClick={handlesave}
                  className={`flex items-center py-2 ${
                    saved ? "border-t-2 border-info" : ""
                  } cursor-pointer`}
                >
                  <span className="mr-1">
                    <FaRegBookmark className="w-4 h-4" />
                  </span>
                  <span>Saved</span>
                </div>
                <div
                  onClick={handleliked}
                  className={`flex items-center py-2 ${
                    liked ? "border-t-2 border-info" : ""
                  } cursor-pointer`}
                >
                  <span className="mr-1">
                    <FaArrowAltCircleRight className="w-4 h-4" />
                  </span>
                  <span>Interaction</span>
                </div>
              </div>
            </div>
            <div className="flex  justify-center p flex-wrap">
              {saved &&
                user.saved &&
                user.saved.map((e, index) => (
                  <div
                    key={index} // Key should be on the outermost element
                    onClick={() => handle_image_click(e._id)}
                    // important ewhen ever we give paramete in the fun we should call it like this!!!!!!!!
                  >
                    <img
                      className="h-44 cursor-pointer w-72 border rounded m-1"
                      alt=""
                      src={`https://notedb.onrender.com/Images/${e.photo}`}
                    />
                  </div>
                ))}
              {post &&
                user.tours &&
                user.tours.map((e) => (
                  <div
                    key={e._id} // Key should be on the outermost element
                    onClick={() => handle_image_click(e._id)}
                  >
                    <img
                      className="h-44 w-72  cursor-pointer border rounded m-1"
                      alt=""
                      src={`https://notedb.onrender.com/Images/${e.photo}`}
                    />
                  </div>
                ))}
              {liked &&
                user.liked &&
                user.liked.map((e) => (
                  <div
                    key={e._id} // Key should be on the outermost element
                    onClick={() => handle_image_click(e._id)}
                  >
                    <img
                      className="h-44 w-72  cursor-pointer border rounded m-1"
                      alt=""
                      src={`https://notedb.onrender.com/Images/${e.photo}`}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Userprofile;
