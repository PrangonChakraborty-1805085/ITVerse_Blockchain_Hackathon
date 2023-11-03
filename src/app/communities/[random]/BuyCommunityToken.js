"use client";
import React, { useEffect, useState } from "react";
import { Box, Modal, Typography } from "@mui/material";

import { useSelector } from "react-redux";
import { ethers } from "ethers";
import { useSearchParams } from "next/navigation";
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
export default function BuyCommunityToken({ contract }) {
  const [open, setOpen] = useState(false);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [totalABXNeeded, setTotalABXNeeded] = useState(0);
  const [abxValue, setAbxValue] = useState(3);
  const [tokenBal, setTokenBal] = React.useState(0);
  const searchparams = useSearchParams();
  let communityAddress = searchparams.get("address");
  const [community, setCommunity] = useState(null);

  const handleClose = async () => {
    setOpen(false);
  };
  const currentCommunity = searchparams.get("title");
  function connectContract() {
    try {
      const { ethereum } = window;
      if (ethereum) {
        ethereum
          .request({
            method: "eth_requestAccounts",
          })
          .then((accounts) => {
            contract
              .getBalanceNativeToken(communityAddress, accounts[0])
              .then((value) => {
                setTokenBal(parseInt(value._hex) / 1000000000000000000);
              });
          });
      } else {
        console.log("ethereum object does not exist");
      }
    } catch (error) {
      console.log("Error happened ", error);
    }
  }

  //   const [currentComm, setCurrentComm] = useState(currentCommunity);

  const handleBuyToken = async (e) => {
    e.preventDefault();
    // const transaction = await contract.buyABX({
    //   value: ethers.utils.parseEther(ether.toString()),
    // });
    const res = await contract.purchaseNativeTokens(
      communityAddress,
      tokenAmount
    );
    setOpen(false);
  };
  return (
    <div className="w-full h-20 flex flex-col items-center justify-center">
      <h2 className="font-bold mr-40">
        Balance: {tokenBal} {currentCommunity} Tokens
      </h2>
      <button
        onClick={() => setOpen(true)}
        className="p-2 bg-indigo-500 border text-white absolute right-4"
      >
        Buy {currentCommunity} Token
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Buy {currentCommunity} Tokens
            </h2>
            <div className="relative mb-4">
              <label
                htmlFor="abx-amnt"
                className="leading-7 text-sm text-gray-600"
              >
                Enter {currentCommunity} Token Amount
              </label>
              <input
                type="number"
                id="token-amnt"
                name="token-amnt"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={tokenAmount}
                onChange={(e) => {
                  setTokenAmount(e.target.value);
                  setTotalABXNeeded(e.target.value * abxValue);
                }}
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                ABX cost
              </label>
              <input
                type="number"
                id="abx"
                name="abx"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={totalABXNeeded}
              />
            </div>
            <button
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              onClick={handleBuyToken}
            >
              Claim {currentCommunity} Tokens
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
