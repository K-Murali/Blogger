import { useContext, useState, useEffect } from "react";
import { noteContext } from "../context/notes/NoteState";
import { useNavigate } from "react-router-dom";
import Noteitem from "./Noteitem";
import Alert from "./Alert";
import Filters from "./Filters";

const Social = () => {
  const naviagte = useNavigate();
  const { allnotes, mode, alert, setalert, flag, getallnotes } =
    useContext(noteContext);

  setTimeout(() => {
    setalert(false);
  }, 9000);

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

  return allnotes && flag === false ? (
    "loading"
  ) : (
    <>
      {alert && <Alert message="This is deleted" />}
      <div className="flex-col justify-center items-center">
       
            <Filters
              className={` me-2  bg-slate-600   rounded text-white  w-16 h-8 bg-${
                mode === "dark" ? "primary" : "info"
              }`}
            />
        <div className="  flex-col items-center">
          {allnotes && allnotes.length !== 0 ? (
            <h1 className="  text-center text-3xl mt-8 "></h1>
          ) : (
            ""
          )}
          <div className="  flex flex-wrap justify-center  ">
            {allnotes && allnotes.length === 0 ? (
              <div className=" font-thin mt-5  text-4xl justify-left  text-zinc-600">
                No Posts to Display
              </div>
            ) : (
              flag &&
              allnotes &&
              allnotes.map((ele, i = 0) => {
                const {
                  title,
                  likes,
                  description,
                  tag,
                  _id,
                  date,
                  photo,
                  comments,
                } = ele;
                return (
                  allnotes && (
                    <Noteitem
                      id={_id}
                      title={title}
                      key={i++}
                      photo={photo}
                      comments={comments}
                      description={description}
                      tag={tag}
                      likes={likes?.length}
                      userid={localStorage.getItem("userid")}
                      del_edit_flag={false}
                      date={date}
                    />
                  )
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Social;
