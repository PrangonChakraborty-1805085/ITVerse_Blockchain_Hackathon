"use client";
import Header from "../../../components/header";
import React, { useState } from "react";
import PendingItem from "./PendingItem";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
export default function PendingPublication({ contract }) {
  const number = [1, 3, 4, 5, 6];
  //   const currCommunity = useSelector(
  //     (state) => state.persistedAuthReducer.value.currentCommunityScanning
  //   );

  const [comm, setComm] = useState("");
  const searchparams = useSearchParams();
  const title = searchparams.get("title");
  const address = searchparams.get("address");
  const [arts, setArts] = useState([]);

  useEffect(() => {
    console.log("address", address);
    contract
      .getArtSubmissionsPending(address)
      .then((value) => {
        setArts(value);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //let tempArts = [{ipfsCID: "bafybeibcec2crelvvhq4tvz57ne7gwvhyrpgpth35x2t7y2cqe3h7wnc2q"}];
  //setArts(tempArts);

  return (
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap w-full mb-20">
          <div class=" w-full mb-6 lg:mb-0">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Pending For Approval
            </h1>
            <h4 class="text-black p-2">
              Give Upvote or Downvote within deadline
            </h4>
            <div class="h-1 w-20 bg-indigo-500 rounded"></div>
          </div>
        </div>
        <div class="flex flex-wrap -m-4">
          {arts.map((art, i) => (
            <PendingItem key={i} art={art} contract={contract} />
          ))}
        </div>
      </div>
    </section>
  );
}
