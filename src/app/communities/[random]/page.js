"use client";
import Header from "../../../components/header";
import React, {  useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import NFT_Item from "./NFT_Item";
import AddIcon from "@mui/icons-material/Add";
import { ethers } from "ethers";
import * as Contracts from "../../../constant";
import { Web3Storage } from "web3.storage";
import { useParams, useSearchParams } from "next/navigation";

import { useSelector } from "react-redux";
import PendingPublication from "./PendingPublication";
import BuyCommunityToken from "./BuyCommunityToken";
import { deepCopy } from "ethers/lib/utils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function page() {
  const API_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY1NDExMURFMTY3OUFhN0M5YmQxMkIyNzg2MDFlYTA5OTJBNGFFZDEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTg5NTU4MDc2MjEsIm5hbWUiOiJwZGYtdGVzdCJ9.7_9LB5P7f04RVufQ55ZWhOBZCufbXJr6xB_P0zDzMDY";
  const client = new Web3Storage({ token: API_TOKEN });
  const number = [1, 3, 4, 5, 6];
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setopen2] = useState(false);
  const handleOpen2 = () => setopen2(true);
  const handleClose2 = () => setopen2(false);

  let [contract, setContract] = useState(null);
  const searchparams = useSearchParams();
  let communityAddress = searchparams.get("address");

  useEffect(() => {
    if (contract == null) {
      connectContract();
    }
  }, [contract]);

  function connectContract() {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      let Contract = new ethers.Contract(
        Contracts.contractAddress,
        Contracts.abi,
        signer
      );
      setContract(Contract);
    }
  }

  const currentCommunity = searchparams.get("title");

  const [currentComm, setCurrentComm] = useState(currentCommunity);

  const [file, setFile] = useState(null);
  const onFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  //! exclusive handler
  const handlePublishExclusive = async (e) => {
    e.preventDefault();
    const cid = await client.put([file]);
    console.log("uploaded file :" + cid);
    const res = await contract.submitArtForPublication(
      communityAddress,
      document.getElementById("text").value,
      document.getElementById("message").value,
      cid,
      true,
      document.getElementById("number2").value,
      document.getElementById("number3").value,
      document.getElementById("number4").value,
      document.getElementById("number5").value
    );
    setOpen(false);
  };

  //! general handler
  const handlePublishGeneral = async (e) => {
    e.preventDefault();
    const cid = await client.put([file]);
    console.log("uploaded file :" + cid);
    const res = await contract.submitArtForPublication(
      communityAddress,
      document.getElementById("text").value,
      document.getElementById("message").value,
      cid,
      false,
      0,
      0,
      0,
      document.getElementById("number6").value
    );
    setopen2(false);
  };

  if (!contract) {
    return <div>loading...</div>;
  }

  async function buyNativeToken() {
    const res = await contract.purchaseNativeToken(communityAddress.random);
  }

  return (
    <section class="text-gray-600 body-font">
      <Header />
      <BuyCommunityToken contract={contract} />
      <PendingPublication contract={contract} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div class=" bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-2 md:mt-0 relative z-10 shadow-md">
            <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">
              Upload an Exclusive file to publish
            </h2>
            <div class="relative">
              <label for="text" class="leading-7 text-sm text-gray-600">
                Title
              </label>
              <input
                type="text"
                id="text"
                name="text"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative">
              <label for="text" class="leading-7 text-sm text-gray-600">
                Starting Price
              </label>
              <input
                type="number"
                id="number2"
                name="number2"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative">
              <label for="text" class="leading-7 text-sm text-gray-600">
                Decremental Price
              </label>
              <input
                type="number"
                id="number3"
                name="number3"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative">
              <label for="text" class="leading-7 text-sm text-gray-600">
                Time Interval (in seconds)
              </label>
              <input
                type="number"
                id="number4"
                name="number4"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative">
              <label for="text" class="leading-7 text-sm text-gray-600">
                Minimum Price
              </label>
              <input
                type="number"
                id="number5"
                name="number5"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative">
              <label for="message" class="leading-7 text-sm text-gray-600">
                Description (up to 20 words)
              </label>
              <textarea
                id="message"
                name="message"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
            <div class="relative">
              <label for="text" class="leading-7 text-sm text-gray-600">
                Upload a File
              </label>
              <input type="file" onChange={onFileChange} />
            </div>
            <button
              onClick={handlePublishExclusive}
              class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Publish
            </button>
            <p className="text-sm p-2 m-2">
              Current Publication Cost : 3 Community Tokens
            </p>
            <p class="text-xs text-gray-500 mt-3"></p>
          </div>
        </Box>
      </Modal>
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap w-full mb-20">
          <div class="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Notable Collections of {currentComm}
            </h1>
            <div class="h-1 w-20 bg-indigo-500 rounded"></div>
            <button
              onClick={handleOpen}
              className="mr-5 p-2 mt-6 ring-1 border"
            >
              <span className="text-black">
                <AddIcon />
              </span>
              publish an Exclusive Art
            </button>

            <button
              onClick={handleOpen2}
              className="mr-5 p-2 mt-6 ring-1 border"
            >
              <span className="text-black">
                <AddIcon />
              </span>
              publish a General Art
            </button>
          </div>
        </div>
        <div class="flex flex-wrap -m-4">
          {number.map((num) => (
            <NFT_Item key={num} />
          ))}
        </div>
      </div>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div class=" bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">
              Upload a general file to publish
            </h2>
            <div class="relative">
              <label for="text" class="leading-7 text-sm text-gray-600">
                Title
              </label>
              <input
                type="text"
                id="text"
                name="text"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative">
              <label for="message" class="leading-7 text-sm text-gray-600">
                Description (up to 20 words)
              </label>
              <textarea
                id="message"
                name="message"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
            <div class="relative">
              <label for="text" class="leading-7 text-sm text-gray-600">
                Price
              </label>
              <input
                type="number"
                id="number6"
                name="number5"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-2">
              <label for="text" class="leading-7 text-sm text-gray-600">
                Upload a File
              </label>
              <input type="file" className="mb-2" onChange={onFileChange} />
            </div>
            <button
              onClick={handlePublishGeneral}
              class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Publish
            </button>
            <p className="text-sm p-2 m-2">
              Current Publication Cost : 3 Community Tokens
            </p>
            <p class="text-xs text-gray-500 mt-3"></p>
          </div>
        </Box>
      </Modal>
    </section>
  );
}
