"use client";
import React, { useState } from "react";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Timer from "./Timer";

export default function PendingItem() {
  const [upcount, setUpcount] = useState(0);
  const [downCount, setDownCount] = useState(0);
  const handleThumbsUp = (e) => {
    e.preventDefault();
    setUpcount(upcount + 1);
    if (upcount % 2 === 0) {
      e.target.style.color = "rgba(51, 51, 51,0.9)";
    } else {
      e.target.style.color = "rgba(0,0,255,0.9)";
    }
  };
  const handleThumbsDown = (e) => {
    e.preventDefault();
    setDownCount(downCount + 1);
    if (downCount % 2 === 0) {
      e.target.style.color = "rgba(51, 51, 51,0.9)";
    } else {
      e.target.style.color = "rgba(255, 0, 0, 0.9)";
    }
  };
  const handleVoteSubmit = (e) => {
    e.preventDefault();
    if (upcount !== 0 || downCount !== 0) {
      // has submitted either upvote or downvote
      if (upcount % 2 !== 0) {
        //upvote pressed ..send request for upvoting
      } else {
        //downvote pressed ..send request for downvoting
      }
    }
  };
  return (
    <div class="xl:w-1/3 md:w-1/2 p-4 cursor-pointer">
      <div class="bg-gray-100 p-6 rounded-lg">
        <img
          class="h-40 rounded w-full object-cover object-center mb-6"
          src="https://dummyimage.com/720x400"
          alt="content"
        />
        <h2 class="text-lg text-gray-900 font-medium title-font mb-4">
          Chichen Itza
        </h2>
        <p class="leading-relaxed text-base">
          Fingerstache flexitarian street art 8-bit waistcoat. Distillery
          hexagon disrupt edison bulbche.
        </p>
        <Timer />
        <div class="flex flex-row items-center justify-evenly p-4">
          <ThumbUpIcon onClick={handleThumbsUp} />
          <ThumbDownIcon onClick={handleThumbsDown} />
        </div>
        <button
          onClick={handleVoteSubmit}
          className="p-2 bg-indigo-500 border text-white w-full"
        >
          Vote
        </button>
      </div>
    </div>
  );
}
