import React, { createContext, useState } from "react";
import { BASE_URL } from "../../utils/api";

export const noteContext = createContext();

const NoteState = (props) => {
  const [name, setname] = useState(
    localStorage.getItem("name") ? localStorage.getItem("name") : "profile"
  );

  const [searchval, setsearchval] = useState("");
  const [query, setQuery] = useState({
    date: {
      gte: "",
      lte: "",
    },
    price: {
      lte: "10000",
    },
    sort: "",
    location: "",
    tag: "",
  });

  const [userid, setuserid] = useState(
    localStorage.getItem("userid") ? localStorage.getItem("userid") : "null"
  );
  const [mode, setmode] = useState(localStorage.getItem("theme"));

  const [currnote, setcurrnote] = useState(null);
  const [user, setuser] = useState(null);
  const [notes, setnotes] = useState(null);
  const [allnotes, setallnotes] = useState(null);
  const [flag, setflag] = useState(true);
  const [loadval, setloadval] = useState(0);

  const [alert, setalert] = useState(true);
  const [message, setmessage] = useState("welcome");

  const [auth, setauth] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  // add a note

  const addnote = async (formData) => {
    setloadval(20);
    setflag(false);
    const options = {
      method: "POST",
      headers: {
        "auth-token": auth,
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const res = await fetch(`${BASE_URL}/api/notes/addnote`, options);
    setloadval(60);
    const allnote = await res.json();
    setloadval(100);
    setflag(true);
    setnotes(allnote);
    setalert(true);
    setmessage("New post added...");
  };
  const addcomment = async (data) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": auth,
      },
      body: JSON.stringify(data),
    };
    const res = await fetch(`${BASE_URL}/api/comments/get`, options);
    const ans = await res.json();
    setalert(true);
    setmessage("New comment added...");
    return ans;
  };
  const getcomment = async (id) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": auth,
      },
    };
    const res = await fetch(`${BASE_URL}/api/notes/getcomments/${id}`, options);
    const ans = await res.json();
    return ans;
  };
  const addlike = async (data) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "auth-token": auth,
      },
      body: JSON.stringify(data),
    };
    const res = await fetch(`${BASE_URL}/api/notes/like`, options);
    const ans = await res.json();
    return ans;
  };
  const savetour = async (data) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "auth-token": auth,
      },
      body: JSON.stringify(data),
    };
    const res = await fetch(`${BASE_URL}/api/auth/save`, options);
    const ans = await res.json();
    setflag(true);
    return ans;
  };

  const getnote = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": auth,
      },
    };

    try {
      setloadval(20);
      const res = await fetch(`${BASE_URL}/api/notes/fetchnotes`, options);
      setloadval(60);
      const allnote = await res.json();
      setloadval(100);
      setnotes(allnote);
      setflag(true);
    } catch (e) {
      setnotes([]);
      console.log(e.message);
    }
  };

  const getallnotes = async (query) => {
    try {
      setloadval(20);
      setloadval(20);
      setloadval(20);
      // setflag(false);
      let url = `${BASE_URL}/api/notes/allnotes`;
      if (query) {
        url = `${BASE_URL}/api/notes/allnotes?${query}`;
      }
      const res = await fetch(url);
      setloadval(60);
      const data = await res.json();
      setallnotes(data);
      setloadval(100);
      setflag(true);
    } catch (e) {
      setallnotes([]);
    }
  };

  // get bookings
  const getbooking = async () => {
    try {
      setloadval(20);
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth,
        },
      };
      const res = await fetch(
        `${BASE_URL}/api/bookings/${localStorage.getItem("userid")}`,
        options
      );
      setloadval(60);
      const temp = await res.json();
      setuser(temp);
      setloadval(100);
    } catch (e) {
      setuser(null);
    }
  };
  const getuserbookings = async () => {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth,
        },
      };
      const res = await fetch(`${BASE_URL}/api/auth/bookings`, options);
      const ans = await res.json();
      console.log(ans);
      return ans;
    } catch (e) {
      return e.message;
    }
  };
  // get user
  const getuserbyid = async () => {
    try {
      setloadval(20);
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth,
        },
      };
      const res = await fetch(`${BASE_URL}/api/auth/getuser`, options);
      setloadval(60);
      const temp = await res.json();
      setuser(temp);
      setloadval(100);
      return temp;
    } catch (e) {
      setuser(null);
    }
  };
  const getlike = async (id) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth,
        },
        body: JSON.stringify({ id: id }),
      };
      const res = await fetch(`${BASE_URL}/api/notes/like/${id}`, options);
      const ans = await res.json();
      console.log(ans);
      return ans;
    } catch (e) {
      console.log(e.message);
    }
  };

  // geta particlarnote using id
  const getbyid = async (id) => {
    setflag(false);
    try {
      setloadval(20);
      console.log(id);
      const base_url = `${BASE_URL}/api/notes/getbyid/${id}`;
      const res = await fetch(base_url);
      setloadval(60);
      const data = await res.json();
      setloadval(100);
      console.log(data);
      setcurrnote(data);
      return data;
    } catch (e) {
      setcurrnote(null);
    }
  };

  // delete a note
  const deletenote = async (id) => {
    setflag(false);

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": auth,
      },
    };
    setloadval(20);
    const base_url = `${BASE_URL}/api/notes/deletenote/${id}`;
    await fetch(base_url, options);
    setloadval(60);
    const newnote = notes.filter((note) => note._id !== id);
    setnotes(newnote);
    setflag(true);
    setloadval(100);
    setalert(true);
    setmessage("Deleted...");
  };

  const editnote = async (id, title, description, tag, formData) => {
    try {
      setflag(false);
      setloadval(20);

      // Update the notes array
      const updatedNotes = notes.map((note) => {
        if (note._id === id) {
          return { ...note, title, description, tag };
        }
        return note;
      });

      setnotes(updatedNotes);

      setloadval(60);

      const options = {
        method: "PUT",
        headers: {
          "auth-token": auth,
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      };

      const base_url = `${BASE_URL}/api/notes/updatenote/${id}`;
      const response = await fetch(base_url, options);

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      setflag(true);
      setalert(true);
      setloadval(100);
      setmessage("Changes Updated...");
    } catch (error) {
      setflag(true);
      setalert(true);
      setloadval(100);
      setmessage("Failed to update note");
    }
  };

  const updateuser = async (data) => {
    setflag(false);
    setloadval(20);

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "auth-token": auth,
      },
      body: JSON.stringify(data),
    };
    setloadval(60);
    const base_url = `${BASE_URL}/api/auth/updateuser`;
    const res = await fetch(base_url, options);
    const ans = await res.json();
    setflag(true);
    setalert(true);
    setloadval(100);
    setmessage("Changes Updated...");
    return ans;
  };

  return (
    <noteContext.Provider
      value={{
        notes,
        setnotes,
        allnotes,
        addnote,
        deletenote,
        getnote,
        editnote,
        getbyid,
        currnote,
        flag,
        setflag,
        getallnotes,
        name,
        setname,
        userid,
        setuserid,
        addcomment,
        addlike,
        savetour,
        getcomment,
        loadval,
        setloadval,
        user,
        setuser,
        getuserbyid,
        getlike,
        updateuser,
        getuserbookings,
        mode,
        query,
        setQuery,
        searchval,
        setsearchval,

        alert,
        setalert,
        message,
        setmessage,

        setauth,
        auth,
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
};
export default NoteState;
