function MsgReceived({ value, onDelete, deleted }) {
  return (
    <div className="group bg-stone-300 text-stone-800 p-4 rounded-xl shadow text-justify w-fit h-fit">
      <span>{value}</span>
    </div>
  );
}

export default MsgReceived;
