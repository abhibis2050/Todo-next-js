"use client";
import { Context } from "@/components/Clients";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {user,setUser} = useContext(Context)

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POSt",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      console.log(res, "res");
      const data = await res.json();
      console.log(data);
      if (!data.success) {
        return toast.error(data.message);
      }
      setUser(data.user);
      toast.success(data.message);
    } catch (error) {
      // return toast.error(data.message);
    }
  };

  if (!user._id) {
    redirect("/login");
  }
  return (
    <div className="login">
      <section>
        <form onSubmit={registerHandler}>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Enter Your Name"
          />
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
          <button type="submit">Sign Up</button>
          <p>OR</p>
          <Link href={"/login"}>Already a User</Link>
        </form>
      </section>
    </div>
  );
};

export default Page;

export const metadata = {
  title: "Register",
  description: "Its the Register Page of Todo App Project",
};
