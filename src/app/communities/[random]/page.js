import React from "react";

export default function page() {
  return (
    <section class="text-gray-600 body-font">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div class=" bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">
              Create a new Community
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
            <button class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Create
            </button>
            <p class="text-xs text-gray-500 mt-3"></p>
          </div>
        </Box>
      </Modal>
      <div className="flex items-center justify-between border shadow-sm">
        <h1 class="text-3xl font-bold text-gray-700 p-5 ml-5">
          Notable Collections
        </h1>
      </div>
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-4">
          {number.map((number, i) => (
            <Community key={number} />
          ))}
        </div>
      </div>
    </section>
  );
}
