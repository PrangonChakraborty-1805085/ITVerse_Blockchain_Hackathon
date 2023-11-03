"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCurrentCommunityScanning } from "../../redux/features/auth-slice";

export default function Community({ title, description, address }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleCommunityEnter = (e) => {
    e.preventDefault();
    console.log("address of community ", address);
    const routeParam = "" + address;
    dispatch(setCurrentCommunityScanning(title));
    //enter a new route for this community
    router.push(`/communities/` + routeParam);
  };
  return (
    <div class="p-4 lg:w-1/3">
      <div class=" shadow-md h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
        <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
          {title}
        </h1>
        <p class="leading-relaxed mb-3">{description}</p>
        <a
          onClick={handleCommunityEnter}
          class="text-indigo-500 inline-flex items-center cursor-pointer"
        >
          Enter
          <svg
            class="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
  );
}
