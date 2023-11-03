"use client";
import React, { useState } from "react";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Timer from "./Timer";

import { Web3Storage } from "web3.storage";
import { ethers } from "ethers";
import * as Contracts from "../../../constant";
import { useSearchParams } from "next/navigation";

export default function PendingItem({ contract, art }) {
  const [upcount, setUpcount] = useState(0);
  const [downCount, setDownCount] = useState(0);
  const searchparams = useSearchParams();
  const communityAddress = searchparams.get("address");
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
  const handleVoteSubmit = async (e) => {
    e.preventDefault();
    if (upcount !== 0 || downCount !== 0) {
      // has submitted either upvote or downvote
      if (upcount % 2 !== 0) {
        //upvote pressed ..send request for upvoting
        try {
          const res = contract.upvoteArtProduct(communityAddress, art.creator);
        } catch (err) {
          console.log(err);
          alert("You have already voted for this product");
        }

      } else {
        //downvote pressed ..send request for downvoting
        try {
          const res = contract.downvoteArtProduct(communityAddress, art.creator);
        } catch (err) {
          console.log(err);
          alert("You have already voted for this product");
        }
      }
    }
  };
  let [img, setImg] = React.useState("");
  const token = Contracts.WEB3_TOKEN;
  const client = new Web3Storage({ token: token });
  React.useEffect(() => {
    client.get(art.ipfsCID).then((value) => {
      value.files().then((files) => {
        console.log(files[0]);
        let url = URL.createObjectURL(files[0]);
        setImg(url);
      });
      //let url = URL.createObjectURL(imgFile);
      //setImg(url);
    });
  }, []);
  return (
    <div class="xl:w-1/3 md:w-1/2 p-4 cursor-pointer">
      <div class="bg-gray-100 p-6 rounded-lg">
        <img
          class="h-40 rounded w-full object-cover object-center mb-6"
          src={img}
          alt="content"
        />
        <h2 class="text-lg text-gray-900 font-medium title-font mb-4">
          {art.title}
        </h2>
        <p class="leading-relaxed text-base">{art.description}</p>
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
