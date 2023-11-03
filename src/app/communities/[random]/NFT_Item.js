"use client";
import React, { useState } from "react";
import { useSearchParams,useRouter } from "next/navigation";

export default function NFT_Item({ art }) {
  const params = useSearchParams();
  const router = useRouter();
  const handleBuy = (e) => {
    e.preventDefault();
    router.push("random/random");
  };
  return (
    <div class="xl:w-1/3 md:w-1/2 p-4">
      <div class="bg-gray-100 p-6 rounded-lg">
        <img
          class="h-40 rounded w-full object-cover object-center mb-6"
          src="https://dummyimage.com/720x400"
          alt="content"
        />
        <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">
          SUBTITLE
        </h3>
        <h2 class="text-lg text-gray-900 font-medium title-font mb-4">
          Chichen Itza
        </h2>
        <p class="leading-relaxed text-base">
          Fingerstache flexitarian street art 8-bit waistcoat. Distillery
          hexagon disrupt edison bulbche.
        </p>
        <button
          onClick={handleBuy}
          className="tracking-widest text-indigo-500 text-xs font-medium title-font text-2xl"
        >
          Buy
        </button>
      </div>
    </div>
  );
}
