function GroupeBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:invert"
    >
      <img className="w-8" src="./grp.png" alt="" />
    </button>
  );
}

export default GroupeBtn;
