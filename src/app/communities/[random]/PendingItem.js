"use client";
import React from "react";
import { Web3Storage } from "web3.storage";
import { ethers } from "ethers";
import * as Contracts from "../../../constant";

export default function PendingItem({art}) {
  let [img, setImg] = React.useState("");
  const token = Contracts.WEB3_TOKEN;
  const client = new Web3Storage({token: token})
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
    <div class="xl:w-1/4 md:w-1/2 p-4">
      <div class="bg-gray-100 p-6 rounded-lg">
        <img
          class="h-40 rounded w-full object-cover object-center mb-6"
          src={img}
          alt="content"
        />
        <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">
          SUBTITLE
        </h3>
        <h2 class="text-lg text-gray-900 font-medium title-font mb-4">
          {art.title}
        </h2>
        <p class="leading-relaxed text-base">
          {art.description}
        </p>
      </div>
    </div>
  );
}
