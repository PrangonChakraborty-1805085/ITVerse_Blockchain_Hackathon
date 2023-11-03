"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'


export default function walletConnect() {
  //net data
  const [correctNetwork, setCorrectNetwork] = useState(false);
  //user data
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  // routing
  const router=useRouter();

  const handleConnectToMetamask = async (e) => {
    e.preventDefault();
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("metamask not detected");
      } else {
        //this request will find a network to connect
        const chainId = await ethereum.request({ method: "eth_chainId" });
        console.log("connected to chain :", chainId);
        const goerliChainId = "0x5";
        if (chainId !== goerliChainId) {
          alert("you are not connected to rinkeby testnet");
          setCorrectNetwork(false);
        } else {
          setCorrectNetwork(true);
          //this request will pop up all accounts in metamask
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          console.log("account found ", accounts[0]);
          console.log("current account is : ",accounts[0]);
          //storing the account in session storage
          //pushing to new page
          router.push("/dashboard");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-bold text-5xl text-gray-900">
              ArtFlair - The Future of Art Gallery
            </h1>
            <p className="leading-relaxed text-xl mt-4">
              Where Art Meets Blockchain. Buy, Sell and Collect Digital Art With Ease and Security.
            </p>
          </div>
          <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Connect to Metamask
            </h2>
            <div className="relative mb-4">
              <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                id="full-name"
                name="full-name"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              onClick={handleConnectToMetamask}
            >
              Connect
            </button>

            <p className="text-xs text-gray-500 mt-3">
              Literally you probably haven't heard of Collywobbles.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

