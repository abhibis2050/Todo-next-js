"use client";
import { Context } from "@/components/Clients";
import { redirect, useRouter } from "next/navigation";
import React, { useContext } from "react";

const Page = () => {
  const router = useRouter();
  const { user } = useContext(Context);

  if (!user._id) {
    // return router.push("/login");
    redirect("/login")
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};

export default Page;
