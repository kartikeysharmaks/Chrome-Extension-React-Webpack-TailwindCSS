import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import arrowDown from "@iconify-icons/mdi/arrow-down";
import reload from "@iconify-icons/mdi/reload";
import send from "@iconify-icons/mdi/send";
import windowClose from "@iconify-icons/mdi/window-close";

const Modal = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [queryText, setQueryText] = useState("");
  const [response, setResponse] = useState("");
  const [insertVisible, setInsertVisible] = useState(false);
  const modalRef = useRef(null);

  //To generate responses, used setTimeout to delay the generate response
  const handleGenerate = () => {
    if (query.trim() === "") {
      alert("Please enter a query.");
      return;
    }
    setQueryText(query)
    const generatedResponse =
      "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
    setTimeout(() => {
      setResponse(generatedResponse);
    }, 1000);  
    
    setInsertVisible(true);
  };

  //to handle the insertion of response into the linkedin message input box
  const handleInsert = () => {
    if (response.trim() === "") {
      alert("Cannot insert empty response.");
      return;
    }
    const messageContentEditable = document.querySelector(
      ".msg-form__contenteditable p"
    );
    if (response && messageContentEditable) {
      messageContentEditable.textContent = response;
    }
    const placeholder = document.querySelector(".msg-form__placeholder");
    if (placeholder) {
      placeholder.remove();
    }
    setQuery("");
    setResponse("");
    setQueryText("");
    setInsertVisible(false);
    onClose();
  };

  //to handle input
  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  //for handling close modal is clicked outside the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 z-50 flex justify-center items-center w-full h-full">
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg p-5 shadow-md w-[400px] md:w-[600]"
      >
        <div className="h-[400px]">
          <div className="w-full bg-gray-700 p-3 flex items-center justify-between rounded-lg">
            <p className="text-white font-bold">
              CHAT<span className="text-yellow-500">GPT.</span>
            </p>
            <button
              className=" text-white font-bold cursor-pointer"
              onClick={onClose}
            >
              <Icon icon={windowClose}/>
            </button>
          </div>
          <div className="flex flex-col mt-3">
            <div className={` ${queryText ? "visible" : "hidden"}`}>
              <p className="rounded-lg p-3 bg-gray-600 mb-3 ml-auto text-right max-w-[200px] text-white text-xl">
                {queryText}
              </p>
            </div>
            <div className={`${response ? "visible" : "hidden"}`}>
              <p className="rounded-lg p-3 bg-blue-400 mb-3 mr-auto text-left max-w-[200px] text-white text-xl">
                {response}
              </p>
            </div>
          </div>
        </div>
        <input
          type="text"
          className="w-full p-3 mb-3 rounded-lg text-base bg-gray-200 focus:bg-gray-200"
          placeholder="Enter your query…"
          value={query}
          onChange={handleQueryChange}
        />
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-1 generate-button p-3 bg-blue-500 hover:bg-blue-800 text-white rounded-lg cursor-pointer text-xl"
            onClick={handleGenerate}
          >
            {response ? <Icon icon={reload} /> : <Icon icon={send} />}
            {response ? "Regenerate" : "Generate"}
          </button>
          {insertVisible && (
            <button
              className="flex items-center gap-1 insert-button p-3 bg-blue-500  hover:bg-blue-800 text-white rounded-lg cursor-pointer text-xl"
              onClick={handleInsert}
            >
              <Icon icon={arrowDown} /> Insert
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
