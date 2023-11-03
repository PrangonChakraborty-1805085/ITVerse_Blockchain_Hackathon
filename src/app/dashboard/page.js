"use client";
import React, { use, useState, useEffect } from "react";
import Community from "./Community";
import AddIcon from "@mui/icons-material/Add";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Header from "../../components/header";
import { create } from "@mui/material/styles/createTransitions";
import { ethers } from "ethers";
import * as Contracts from "../../constant";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};



export default function page() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let [contract, setContract] = useState(null);
  let [communities, setCommunities] = useState([]);



  useEffect(() => {
    if (contract == null) {
      connectContract();
    }
    else {
      try {
        contract.getCommunities().then((value) => {
          setCommunities(value);
          console.log(value);
        });
      }
      catch (error) {
        console.log(error);
      }
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

  async function createCommunity(e) {
    e.preventDefault();

    //console.log(document.getElementById("text").value);
    try {
      let res = await contract.createCommunity(document.getElementById("text").value, document.getElementById("message").value,
       document.getElementById("xchngr").value, document.getElementById("stkamnt").value, document.getElementById("rqr").value);
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
    //console.log(res);
  }


if (contract == null) {
  return (
    <div>
      <h1>Loading</h1>
    </div>
  );
}


return (
  <section class="text-gray-600 body-font">
    <Header />
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form>
          <div class=" bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">
              Create a new Community
            </h2>

            <div class="relative mb-2">
              <label for="text" class="leading-7 text-sm text-gray-600">
                Title
              </label>
              <input
                type="text"
                id="text"
                name="text"
                required
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-2">
              <label for="message" class="leading-7 text-sm text-gray-600">
                Description (up to 20 words)
              </label>
              <textarea
                id="message"
                name="message"
                required
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
            <div class="relative mb-2">
              <label for="xchngr" class="leading-7 text-sm text-gray-600">
                Exchange Rate (ABX/NToken)
              </label>
              <input
                type="number"
                id="xchngr"
                name="xchngr"
                required
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-2">
              <label for="stkamnt" class="leading-7 text-sm text-gray-600">
                Stack Amount (NToken)
              </label>
              <input
                type="number"
                id="stkamnt"
                name="stkamnt"
                required
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-2">
              <label for="rqr" class="leading-7 text-sm text-gray-600">
                Token Requirement For Membership(NToken)
              </label>
              <input
                type="number"
                id="rqr"
                name="rqr"
                required
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button onClick={createCommunity}
              class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Create
            </button>
            <p className="text-sm p-2 m-2">
              Current Community Creation Cost : 5 ABX Tokens
            </p>
            <p class="text-xs text-gray-500 mt-3"></p>
          </div>
        </form>
      </Box>
    </Modal>
    <div className="flex items-center justify-between border shadow-sm">
      <h1 class="text-3xl font-bold text-gray-700 p-5 ml-5">
        My Communities
      </h1>
      <button onClick={handleOpen} className="mr-5 p-2 ring-1 border">
        <span className="text-black">
          <AddIcon />
        </span>
        Create Community
      </button>
    </div>
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-wrap -m-4">
        {communities.map((community, i) => (
          <Community key={i} title={community.title} description={community.description} />
        ))}
      </div>
    </div>
  </section>
);
}
