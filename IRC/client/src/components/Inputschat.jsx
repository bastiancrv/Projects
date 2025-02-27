function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  fichier,
  colorbg = "bg-stone-800",
  colortxt = "text-white",
  placeholdercolor = "placeholder-stone-400",
}) {
  return (
    <div className="flex items-center gap-2 w-full">
      <input
        className={`w-full ${colorbg} ${colortxt} rounded-full ${placeholdercolor} placeholder-opacity-75 focus:outline-none text-stone-300 placeholder:pl-0 pl-2 focus:ring-transparent`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <button type="submit" className="w-8">
        <img src={`./${fichier}.png`} alt="" />
      </button>
    </div>
  );
}

export default Input;
