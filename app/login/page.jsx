"use client";

import { Context } from "@/components/Clients";
import Link from "next/link";
import React,{useContext, useState} from "react";
import { redirect } from 'next/navigation';
import { toast } from "react-hot-toast";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {user,setUser} = useContext(Context)

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res= await fetch("/api/auth/login", {
        method: "POSt",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      const data = await res.json();
      if(!data.success){
        return toast.error(data.message)
      }
      setUser(data.user)
      toast.success(data.message)
      console.log(data );
    } catch (error) {
      return toast.error(data.message)
    }
  };

  if(user?._id){
     redirect("/")
  }

  return (
    <div className="login">
      <section>
        <form onSubmit={loginHandler}>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Enter Your Email"
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Enter Your Password"
          />

          <button type="submit">Login</button>
          <p>OR</p>
          <Link href={"/register"}>New User</Link>
        </form>
      </section>
    </div>
  );
};

export default Page;

export const metadata = {
  title: "Login",
  description: "Its the Login Page of Todo App Project",
};
