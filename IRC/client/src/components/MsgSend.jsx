import React from "react";

function MsgSend({ value, onDelete, deleted }) {
  return (
    <div className="group bg-green-300 w-fit h-auto p-4 rounded-xl shadow-lg flex flex-row text-stone-900 text-justify break-all">
      <span>{value}</span>
      {!deleted && (
        <button
          className="ml-2 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out"
          onClick={onDelete}
        >
          <img
            className="min-w-6 max-w-6 transition duration-300 ease-in-out hover:scale-105 hover:invert"
            src="./delete.png"
            alt=""
          />
        </button>
      )}
    </div>
  );
}

export default MsgSend;
