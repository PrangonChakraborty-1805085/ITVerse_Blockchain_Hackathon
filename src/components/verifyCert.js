import React, { useState } from "react";
import AddressAbi from "../../contractConfig/AddressAbi.json";
import { Address } from "../../contractConfig/ContractAddress.js";
import { ethers } from "ethers";

export default function VerifyCertificate() {
  const [CID,setCID]=useState('');
  const[wallet,setWallet]=useState('');
  const [verified,setVerified]=useState(false);
  const [right,setRight]=useState(false);
  const [wrong,setWrong]=useState(false);
  const [expired,setExpired]=useState(false);
  const handleVerification = async (e) => {

    e.preventDefault();
    setVerified(true);
    //handle verfication here
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const Contract = new ethers.Contract(Address, AddressAbi.abi, signer);
        var res = await Contract.verifyCertificate(CID,wallet);
        //await res.wait(1);
        if(res==="valid") {
          setRight(true);
        }
        else if(res==="invalid")
        {
          setWrong(true);
        }
        else 
        {
          setExpired(true);
        }
      } else {
        console.log("ethereum object does not exist");
      }
    } catch (error) {
      console.log("Error happened ", error);
    }
  };
  return (
    <div>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Verify Certificate
            </h1>
          </div>
          <div class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
            <div class="relative flex-grow w-full">
              <label for="full-name" class="leading-7 text-sm text-gray-600">
                CID(Content ID)
              </label>
              <input
                type="text"
                id="full-name"
                name="full-name"
                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={CID}
                onChange={(e) => {
                  setCID(e.target.value);
                  setVerified(false);
                  setRight(false);
                  setWrong(false);
                  setExpired(false);
                  }}
              />
            </div>
            <div class="relative flex-grow w-full">
              <label for="email" class="leading-7 text-sm text-gray-600">
                Wallet Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={wallet}
                onChange={(e) => {
                  setWallet(e.target.value);
                  setVerified(false);
                  setRight(false);
                  setWrong(false);
                  setExpired(false);
                  }}
              />
            </div>
            <button
              class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              onClick={handleVerification}
            >
              Verify
            </button>
            {verified && right &&  <button
              class="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
              onClick={handleVerification}
            >
              Valid
            </button>}
            {verified && wrong &&  <button
              class="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
              onClick={handleVerification}
            >
              Invalid
            </button>}
            {verified && expired &&  <button
              class="text-white bg-gray-500 border-0 py-2 px-8 focus:outline-none hover:bg-gray-600 rounded text-lg"
              onClick={handleVerification}
            >
              Expired
            </button>}
          </div>
         
        </div>
      </section>
    </div>
  );
}
