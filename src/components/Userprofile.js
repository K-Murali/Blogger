import React, { useEffect, useContext, useState } from "react";
import img from "./images/899048.png";
import { IMAGE_URL } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { noteContext } from "../context/notes/NoteState";
import { LiaOpencart } from "react-icons/lia";

import { FaBookmark } from "react-icons/fa";
import { BiSolidGridAlt } from "react-icons/bi";
import { FaArrowAltCircleRight, FaRegBookmark } from "react-icons/fa";
import Alert from "./Alert";

const Userprofile = () => {
  const [photo, setphoto] = useState("");
  const [photoflag, setphotoflag] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const [newuser, setnewuser] = useState({
    name: "",
    email: "",
    photo: "",
  });
  const [msg, setmsg] = useState("");
  const handlechange = (e) => {
    setnewuser({ ...newuser, [e.target.name]: e.target.value });
  };
  const handlesubmit = async (e) => {
    if (newuser.name.length > 0) localStorage.setItem("name", newuser.name);
    if (newuser.email.length > 0) localStorage.setItem("email", newuser.email);
    e.preventDefault();

    if (photoflag) {
      const cloudinary = new FormData();
      cloudinary.append("file", photo);
      cloudinary.append("upload_preset", "natours");
      cloudinary.append("cloud_name", "drfvhp1jh");

      const options = {
        method: "POST",
        body: cloudinary,
      };

      setloading(true);
      const userphoto = await fetch(
        `https://api.cloudinary.com/v1_1/drfvhp1jh/image/upload`,
        options
      );
      const ans = await userphoto.json();
      newuser.photo = ans.url.split("upload/")[1];
      if (newuser.photo.length > 0)
        localStorage.setItem("photo", newuser.photo);
    }
    const res = await updateuser(newuser);
    setloading(false);
    setphotoflag(false);
    setphoto("");
    setmsg(res.msg);
  };
  const { getuserbyid, user, setloadval, setalert, alert, flag, updateuser } =
    useContext(noteContext);
  const [saved, setsaved] = useState(false);
  const [post, setpost] = useState(false);
  const [liked, setliked] = useState(false);
  const [book, setbook] = useState(true);

  setTimeout(() => {
    setalert(false);
  }, 9000);

  const handlesave = () => {
    setsaved(true);
    setliked(false);
    setpost(false);
    setbook(false);
  };
  const handlepost = () => {
    setpost(true);
    setliked(false);
    setsaved(false);
    setbook(false);
  };
  const handleliked = () => {
    setliked(true);
    setpost(false);
    setsaved(false);
    setbook(false);
  };
  const handlebook = () => {
    setbook(true);
    setliked(false);
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
          <div className="flex  items-center shadow-2xl rounded-lg border-2 m-5 p-5  flex-col w-[900px] h-auto">
            <h1 className="text-2xl  font-bold">Your Account</h1>
            <div className="flex flex-col md:flex-row justify-center items-center gap-2 w-full ">
              <div className="flex lg:p-3 items-center justify-between h-auto">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center lg:h-64 sm:h-fit rounded-lg cursor-pointer"
                >
                  <div className="flex flex-col justify-center items-center  pt-5 pb-6">
                    <img
                      className="border-2 border-black p-1 w-32 h-32 md:w-36 md:h-28 lg:w-44 lg:h-36 rounded-full mb-4"
                      src={`${IMAGE_URL}/${localStorage.getItem("photo")}`}
                      alt="User"
                    />
                    <div>
                      <p className="mb-2 text-sm underline text-center text-gray-500">
                        <span className="font-semibold hover:text-info">
                          {!photoflag ? "Click to upload" : "uploaded"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <input
                    id="dropzone-file"
                    onChange={(e) => {
                      setphoto(e.target.files[0] ? e.target.files[0] : photo);
                      setphotoflag(true);
                    }}
                    type="file"
                    className="hidden"
                  />
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
                  {loading ? "Updating..." : "Update changes"}
                </button>
              </div>
            </div>
            <div className="border-2 w-full border-gray-300 "></div>
            <div>
              <div className="flex gap-5  justify-around mb-5 ">
                <div
                  onClick={handlebook}
                  className={`flex   p-3 items-center ${
                    book ? "border-t-2 border-info" : ""
                  } cursor-pointer`}
                  v
                >
                  <span className="mr-1 ">
                    <LiaOpencart className="w-5 h-5" />
                  </span>
                  <span>Bookings</span>
                </div>
                <div
                  onClick={handlesave}
                  className={`flex   p-3 items-center ${
                    saved ? "border-t-2 border-info" : ""
                  } cursor-pointer`}
                >
                  <span className="mr-1">
                    <FaBookmark className="w-4 h-4" />
                  </span>
                  <span>&nbsp;Saved</span>
                </div>
                <div
                  onClick={handleliked}
                  className={`flex   p-3 items-center ${
                    liked ? "border-t-2 border-info" : ""
                  } cursor-pointer`}
                >
                  <span className="mr-1">
                    <FaArrowAltCircleRight className="w-4 h-4" />
                  </span>
                  <span>&nbsp;Liked</span>
                </div>
                <div
                  onClick={handlepost}
                  className={`flex   p-3 items-center ${
                    post ? "border-t-2 border-info" : ""
                  } cursor-pointer`}
                >
                  <span className="mr-1">
                    <BiSolidGridAlt className="w-5 h-5" />
                  </span>
                  <span>Posts</span>
                </div>
              </div>
            </div>

            <div className="flex  justify-center  flex-wrap">
              {saved &&
                user.saved &&
                user.saved.map((e, index) => (
                  <div
                    key={index} // Key should be on the outermost element
                    onClick={() => handle_image_click(e._id)}
                    // important ewhen ever we give paramete in the fun we should call it like this!!!!!!!!
                  >
                    <img
                      className=" cursor-pointer lg:h-44 lg:w-72 w-36 h-15 border rounded m-1"
                      alt=""
                      src={`${IMAGE_URL}/${e.photo}`}
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
                      className="lg:h-44 lg:w-72 w-36 h-12  cursor-pointer border rounded m-1"
                      alt=""
                      src={`${IMAGE_URL}/${e.photo}`}
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
                      className="lg:h-44 lg:w-72 lg:m-1 w-32 h-12   cursor-pointer border rounded "
                      alt=""
                      src={`${IMAGE_URL}/${e.photo}`}
                    />
                  </div>
                ))}
              {book &&
                user.bookings &&
                user.bookings.map((e) => (
                  <div
                    key={e._id} // Key should be on the outermost element
                    onClick={() => handle_image_click(e.tour._id)}
                  >
                    <img
                      className="lg:h-44 lg:w-72 lg:m-1 w-32 h-12   cursor-pointer border rounded "
                      alt=""
                      src={`${IMAGE_URL}/${e.tour.photo}`}
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
