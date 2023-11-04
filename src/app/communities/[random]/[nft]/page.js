"use client";
import { useState } from "react";
import { useEffect } from "react";
import { Web3Storage } from "web3.storage";
import { ethers } from "ethers";
import * as Contracts from "../../../../constant";
import Header from "../../../../components/header";

export default function NFT({ art, contract, communityAddress }) {
  let [img, setImg] = useState("");
  let client = new Web3Storage({ token: Contracts.WEB3_TOKEN });
  if (!art) {
    art = {
      title: "Monalisa",
      description: "A duplicate copy",
      ipfsCID: "bafybeibcec2crelvvhq4tvz57ne7gwvhyrpgpth35x2t7y2cqe3h7wnc2q",
      price: 1,
    };
  }
  useEffect(() => {
    client.get(art.ipfsCID).then((value) => {
      value.files().then((files) => {
        console.log(files[0]);
        let url = URL.createObjectURL(files[0]);
        setImg(url);
      });
    });
  }, [art]);

  async function handleBuy(e) {
    e.preventDefault();
    try{
        const res = await contract.buy(communityAddress, art.ipfsCID);
    }
    catch(err){
        console.log(err);
        alert(err);
    }
  }

  return (
    <section class="text-gray-600 body-font overflow-hidden">
      <Header />
      <div class="container px-5 py-24 mx-auto">
        <div class="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={img}
          ></img>
          <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
              {art.title}
            </h1>
            <p class="leading-relaxed">{art.description}</p>
            <div class="flex">
              <span class="title-font font-medium text-2xl text-gray-900">
                {art.price} Token
              </span>
              <button onClick={handleBuy}
                class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
