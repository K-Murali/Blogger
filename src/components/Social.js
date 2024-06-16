import { useContext, useEffect } from "react";
import { noteContext } from "../context/notes/NoteState";
import Noteitem from "./Noteitem";
import Alert from "./Alert";

const Social = () => {
  const { allnotes, alert, setalert, flag, getallnotes } =
    useContext(noteContext);

  setTimeout(() => {
    setalert(false);
  }, 9000);

  useEffect(() => {
    getallnotes();
  }, [flag]);

  return flag === false ? (
    "loading"
  ) : (
    <>
      {alert && <Alert message="This is deleted" />}
      <div className="  flex-col items-center">
        {allnotes && allnotes.length !== 0 ? (
          <h1 className="  text-center text-3xl mt-8 ">Blogs</h1>
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
    </>
  );
};

export default Social;
