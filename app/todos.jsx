import { TodoItems } from "@/components/ServerComponents";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const axios = require("axios");

const fetchTodo = async (token) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/myTask",
      headers: {
        Cookie: `token=${token}`,
      },
    };

    const res = await axios.request(config);
    const data = await res.data;
    // console.log("data------>",data);

    if (!data.success) {
      return [];
    }
    return data.task;
  } catch (error) {
    return [];
  }
};



const Todos = async () => {
  const token = cookies().get("token")?.value;
  console.log("cookie token --->", token);

  if (!token) {
    return redirect("/login");
  }

  const tasks = await fetchTodo(token);
  return (
    <div>
      <section className="todosContainer">
        {tasks?.map((i) => {
          return (
            <TodoItems
              key={i._id}
              title={i.title}
              description={i.description}
              id={i._id}
              completed={i.isCompleted}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Todos;
