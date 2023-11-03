"use client";
import React from "react";
import BasicMenu from "./basicMenu";
import { Box, Modal, Typography } from "@mui/material";
import styled from "@emotion/styled";
import * as Contracts from "../constant";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  setAbxPurchaseRate,
  setAbxBalance,
  setContract,
} from "../redux/features/auth-slice";
export default function Header() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClose = async () => {
    setOpen(false);
  };
  let [abx, setAbx] = React.useState(0);
  let [ether, setEther] = React.useState(0);
  let [contract, settContract] = React.useState(null);
  let [ethxValue, setEthxValue] = React.useState(0);
  let [abxBal, setAbxBal] = React.useState(0);

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
  //TODO: change the address and abi and validate function
  function connectContract() {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        let Contract = new ethers.Contract(
          Contracts.contractAddress,
          Contracts.abi,
          signer
        );
        console.log(Contract);
        settContract(Contract);
        // dispatch(setContract(Contract));
        Contract.ABX_Price().then((value) => {
          setEthxValue(parseInt(value._hex) / 1000000000000000000);
          dispatch(
            setAbxPurchaseRate(parseInt(value._hex) / 1000000000000000000)
          );
        });
        ethereum
          .request({
            method: "eth_requestAccounts",
          })
          .then((accounts) => {
            console.log(accounts[0]);
            Contract.balanceOf(accounts[0]).then((value) => {
              setAbxBal(parseInt(value._hex));
              dispatch(setAbxBalance(parseInt(value._hex)));
            });
          });
      } else {
        console.log("ethereum object does not exist");
      }
    } catch (error) {
      console.log("Error happened ", error);
    }
  }

  if (contract == null) {
    connectContract();
  }

  const handleBuyAbx = async (e) => {
    e.preventDefault();
    const transaction = await contract.buyABX({
      value: ethers.utils.parseEther(ether.toString()),
    });
  };

  return (
    <header className="text-gray-600 body-font shadow-md">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a onClick={(e)=>{router.push('/')}} className="cursor-pointer flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">ArtFlair</span>
        </a>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <BasicMenu name={"community"} />
          {/* <BasicMenu name={"Second Link"} /> */}
          {/* <BasicMenu name={"Third Link"} /> */}
        </nav>
        {/* <div>{abxBal}</div> */}
        {/* <div>{ethxValue}</div> */}
        <h2 className="font-bold mr-5">Balance: {abxBal} ABX Tokens</h2>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
        >
          Buy ABX
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Buy ABX
            </h2>
            <div className="relative mb-4">
              <label
                htmlFor="abx-amnt"
                className="leading-7 text-sm text-gray-600"
              >
                Enter ABX Amount
              </label>
              <input
                type="number"
                id="abx-amnt"
                name="abx-amnt"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={abx}
                onChange={(e) => {
                  setAbx(e.target.value);
                  setEther(e.target.value * ethxValue);
                }}
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Approx. Ether cost
              </label>
              <input
                type="number"
                id="ether"
                name="ether"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={ether}
              />
            </div>
            <button
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              onClick={handleBuyAbx}
            >
              Claim ABX Tokens
            </button>
          </div>
        </Box>
      </Modal>
    </header>
  );
}
