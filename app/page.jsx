import React, { Suspense } from "react";
import AddTodo from "./addTodoForm";
import Todos from "./todos";

const Page = async () => {
  
  
  return (
    <div className="container">
      <AddTodo />

      <Suspense fallback={<div>loading...... </div>}>
      <Todos/>
      </Suspense>
      
    </div>
  );
};

export default Page;
