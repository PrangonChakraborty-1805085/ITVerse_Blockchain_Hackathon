"use client";
import Header from "../../../components/header";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import NFT_Item from "./NFT_Item";
import AddIcon from "@mui/icons-material/Add";

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
  const number = [1, 3, 4, 5, 6];
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [file, setFile] = useState(null);
  const onFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };
  const onFileUpload = (e) => {
    e.preventDefault();
  };

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
          <div class=" bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">
              Upload a file to publish
            </h2>
            <div class="relative mb-4">
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
            <div class="relative mb-4">
              <label for="message" class="leading-7 text-sm text-gray-600">
                Description (up to 20 words)
              </label>
              <textarea
                id="message"
                name="message"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
            <div class="relative mb-4">
              <label for="text" class="leading-7 text-sm text-gray-600">
                Upload a File
              </label>
              <input type="file" onChange={onFileChange} />
            </div>
            <button class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Publish
            </button>
            <p className="text-sm p-2 m-2">
              Current Community Creation Cost : 3 Community Tokens
            </p>
            <p class="text-xs text-gray-500 mt-3"></p>
          </div>
        </Box>
      </Modal>
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap w-full mb-20">
          <div class="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Notable Collections
            </h1>
            <div class="h-1 w-20 bg-indigo-500 rounded"></div>
            <button
              onClick={handleOpen}
              className="mr-5 p-2 mt-6 ring-1 border"
            >
              <span className="text-black">
                <AddIcon />
              </span>
              publish an Art
            </button>
          </div>
        </div>
        <div class="flex flex-wrap -m-4">
          {number.map((num) => (
            <NFT_Item key={num} />
          ))}
        </div>
      </div>
    </section>
  );
}
