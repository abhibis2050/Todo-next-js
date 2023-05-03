"use client";

import React, { useContext, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Context } from "@/components/Clients";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
const {user} = useContext(Context)
  const router = useRouter();
  
  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/newTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (!data.success) {
        return toast.error(data.message);
      }

      toast.success(data.message);
      router.refresh();
      setTitle("");
      setDescription("");
    } catch (error) {
      return toast.error(data.message);
    }
  };

  if (!user._id) {
    redirect("/login");
  }
  return (
    <div className="login">
      <section>
        <form onSubmit={SubmitHandler}>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            placeholder="Task Title"
          />
          <input
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            type="text"
            placeholder="Task Description"
          />
          <button type="submit">Add Task</button>
        </form>
      </section>
    </div>
  );
};

export default AddTodo;
