"use client";
import Header from "../../../components/header";
import React, { useState } from "react";
import PendingItem from "./PendingItem";
import { useSelector } from "react-redux";
export default function PendingPublication() {
  const number = [1, 3, 4, 5, 6];
//   const currCommunity = useSelector(
//     (state) => state.persistedAuthReducer.value.currentCommunityScanning
//   );
  const [comm, setComm] = useState(currCommunity);

  return (
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap w-full mb-20">
          <div class=" w-full mb-6 lg:mb-0">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Pending Publications for {comm}
            </h1>
            <div class="h-1 w-20 bg-indigo-500 rounded"></div>
          </div>
        </div>
        <div class="flex flex-wrap -m-4">
          {number.map((num) => (
            <PendingItem key={num} />
          ))}
        </div>
      </div>
    </section>
  );
}
