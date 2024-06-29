import { LiaOpencart } from "react-icons/lia";
import React, { useState, useEffect, useContext } from "react";
import { noteContext } from "../context/notes/NoteState";
import { IMAGE_URL } from "../utils/api";
import "./noteitem.css"; // Import CSS file for styling
import img from "./images/899048.png";
import { useNavigate } from "react-router-dom";
import { FaArrowAltCircleRight, FaRegSmileWink } from "react-icons/fa";
import {
  AiOutlineLike,
  AiOutlineDelete,
  AiOutlineDislike,
} from "react-icons/ai";
import { FaRegComment, FaRegBookmark, FaRegEdit } from "react-icons/fa";
import BookTourButton from "../utils/bookings";

const Readmore = () => {
  const navigate = useNavigate();
  const { currnote, getbyid, getlike, addcomment, getuserbookings } =
    useContext(noteContext);
  const [likes, setlikes] = useState("");
  const [booked, setbooked] = useState(null);
  const [newcom, setnewcom] = useState("");
  const [comarray, setcomarray] = useState("");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const handle_comment_submit = async (e) => {
    e.preventDefault();

    const res = await addcomment({
      tour: localStorage.getItem("id"),
      users: localStorage.getItem("userid"),
      comment: newcom,
    });
    setcomarray(comarray.concat(res.data.reviews));
  };

  const handleLike = async () => {
    const res = await getlike(localStorage.getItem("id"), likes);
    console.log(res);
    setlikes(res.likes);
  };
  useEffect(() => {
    const caller = async () => {
      const res2 = await getuserbookings();
      if (res2.includes(localStorage.getItem("id"))) {
        setbooked(true);
      }
      const res = await getbyid(localStorage.getItem("id"));
      setlikes(res.likes.length);
      setcomarray(res.comments);
    };
    caller();
  }, []);
  // useEffect(() => {}, [likes]);

  return (
    currnote && (
      <div className="flex justify-center align-middle mt-5  items-center w-full">
        <div className="    lg:flex-row flex  flex-col sm:w-full md:full lg:w-3/4 justify-center   p-3 border  rounded-lg bg-white shadow-lg">
          <div className="sm:w-full md:full lg:w-5/6">
            <div
              onClick={() => {
                navigate("/myprofile");
              }}
              className="   cursor-pointer flex items-center mb-4"
            >
              <img
                className="profile-pic sm:w-full md:full lg:w-12 lg:h-12 rounded-full mr-4"
                src={img}
                alt="Profile"
              />
              <span className="username font-bold">{currnote.user.name}</span>
            </div>
            <img
              className="border-2 h-auto sm:w-full md:full lg:w-11/12  mb-4"
              src={`${IMAGE_URL}/${currnote.photo}`}
              alt="Post"
            />
            <div className="flex justify-between sm:w-full md:full lg:w-11/12  mb-4">
              <div className="flex   gap-4 text-lg">
                <button
                  disabled={
                    localStorage.getItem("token").length == 0 ? true : false
                  }
                  onClick={handleLike}
                  className="flex items-center"
                >
                  <AiOutlineLike className="lg:w-6 lg:h-6 sm:w-4 sm:h-4 " />
                  <span className="sm:text-xsm lg:text-md"> {likes} likes</span>
                </button>
                <button
                  disabled={
                    localStorage.getItem("token").length == 0 ? true : false
                  }
                  className="flex items-center"
                >
                  <FaRegComment className="lg:w-6 lg:h-6 sm:w-4 sm:h-4 mr-1" />
                  <span className="sm:text-xsm  lg:text-md">
                    {currnote.comments.length}&nbsp;comments
                  </span>
                </button>
              </div>
              <div className="">
                <span className=" font-normal   text-sm   text-gray-500">
                  {new Date(currnote.date).getDate()}
                  &nbsp;{months[new Date(currnote.date).getMonth()]}
                </span>
              </div>
            </div>
            <div className="post-caption sm:w-full md:full lg:w-11/12 mb-4">
              <div className="text-xl mb-2 font-semibold">{currnote.title}</div>
              <div className="hashtags">{currnote.description}</div>
            </div>
          </div>
          <div className="flex-col sm:w-full md:full lg:w-1/2  justify-start">
            <div
              onClick={() => {
                navigate("/myprofile");
              }}
              className="   cursor-pointer flex items-center mb-4"
            >
              <img
                className="profile-pic w-12 h-12 rounded-full mr-4"
                src={img}
                alt="Profile"
              />
              <span className="username font-bold">{currnote.user.name}</span>
            </div>

            <div className=" flex justify-start text-blue-700 w-3/4 ">
              #{currnote.tag.split(",")}
            </div>
            <div
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              className="flex-col  h-48  overflow-y-scroll  "
            >
              <div className="comment mb-2">
                <span className="username font-bold">love_boy_diip_550k</span>
                <span> Radhe radhe🙌❤️</span>
              </div>
              {comarray &&
                comarray.map((e) => {
                  return (
                    <div className="comment mb-2 flex justify-between pr-1 username ">
                      <div>
                        <span className="username font-bold">
                          {e.users.name}
                        </span>
                        <span className=" font-normal"> {e.comment}</span>
                      </div>
                      <div>
                        <span className=" font-normal   text-sm   text-gray-500">
                          {new Date(e.createdtAt).getDate()}
                          &nbsp;{months[new Date(e.createdtAt).getMonth()]}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="flex justify-around ">
              <input
                onChange={(e) => {
                  setnewcom(e.target.value);
                }}
                className="add-comment w-full p-2 border rounded-lg mt-4"
                type="text"
                placeholder="Add a comment..."
              />
              <button className=" mt-4">
                <FaArrowAltCircleRight
                  className="w-6 h-5"
                  onClick={handle_comment_submit}
                />
              </button>
            </div>
            <div className=" mt-10 ml-5 ">
              <ul className=" list-disc gap-3">
                <li> Cost : {currnote.price} -/</li>
                <li>Average Room Cost : 800 -/day </li>
                <li>Locations : {currnote.location}</li>
                <li>Average rating : 4.6</li>
              </ul>
            </div>
            <div
              className="flex    sm:justify-center sm: mt-10 sm:mb-10 justify-around sm:relative md:relative  lg:relative
             gap-5"
            >
              {!booked ? (
                <div>
                  <BookTourButton />
                </div>
              ) : (
                <div>
                  <button className="  bg-green-700 btn-sm text-md hover:bg-green-500 text-white font-bold  rounded-full">
                    <div className="flex gap-3">
                      <LiaOpencart className=" w-5  h-6" />
                      Tour Booked
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Readmore;
