import React from "react";
import { FaRegHeart } from "react-icons/fa";

function LikeCount({ props }) {
  return (
    <button
      type="button"
      className="justify-center flex items-center gap-1 text-1xl"
    >
      <FaRegHeart />
      {0}
    </button>
  );
}

export default LikeCount;
