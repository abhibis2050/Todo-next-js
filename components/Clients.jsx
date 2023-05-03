"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
const axios = require("axios");

export const Context = createContext({ user: {} });

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const fetchMyData = async () => {
    const res = await fetch("/api/auth/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data.success) {
      setUser(data.user);
    }
  };

  useEffect(() => {
    fetchMyData();
  }, []);

  return (
    <Context.Provider value={{ user, setUser }}>
      {children}
      <Toaster />
    </Context.Provider>
  );
};

export const LogOutBtn = () => {
  const { user, setUser } = useContext(Context);
  const logoutHandler = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!data.success) {
        return toast.error(data.message);
      }
      setUser({});
      toast.success(data.message);
    } catch (error) {
      return toast.error(error.message);
    }
  };

  return user?._id ? (
    <button className="btn" onClick={logoutHandler}>
      Logout
    </button>
  ) : (
    <Link href={"/login"}>Login</Link>
  );
};

export const TodoButton = ({ id, completed }) => {
  const router = useRouter();


  const deleteHandler = async (id) => {
    console.log(id);
    try {
      const config = {
        method: "delete",
        url: `/api/task/${id}`,
      };

      const res = await axios.request(config);

      const data = res.data;
      console.log("data delete------>", data);
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh()
    } catch (error) {
      return toast.error(error);
    }
  };


  const updateHandler = async (id) => {
    console.log("update handler->",id);
    try {
      const config = {
        method: "patch",
        url: `/api/task/${id}`,
      };

      const res = await axios.request(config);
      const data = res.data;
      console.log("data update------>", data);
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh()
    } catch (error) {
      return toast.error(error);
    }
  };



  return (
    <>
      <input type="checkbox" checked={completed} onChange={()=>updateHandler(id)}/>
      <button className="btn" onClick={() => deleteHandler(id)}>
        Delete
      </button>
    </>
  );
};
