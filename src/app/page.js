"use client";
import Decrement from "../components/Decrement";
import Increment from "../components/Increment";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function Home() {
  // const [Name, setName] = useState("");
  const name = useSelector((state) => {
    return state.persistedAuthReducer.value.user;
  });
  console.log("name is ", name);
  return (
    <div>
      <h1>user is : {name}</h1>
      <Increment />
      <Decrement />
    </div>
  );
}
