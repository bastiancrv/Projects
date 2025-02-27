import React from "react";

function Inputslog({ name, type, id, placeholder, onChange }) {
  return (
    <div>
      <label htmlFor="email" className="text-sm mb-1 text-slate-400">
        {name}
      </label>
      <input
        onChange={onChange}
        type={type}
        id={id}
        className="w-full bg-transparent border-b-2 text-neutral-900 p-2 rounded-lg placeholder-stone-400 focus:outline-none focus:ring-none"
        required
      />
    </div>
  );
}

export default Inputslog;
