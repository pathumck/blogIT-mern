import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { FaRegComment } from "react-icons/fa";

function CommentCount({ props }) {
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/comment/get-count/${props.blogid}`,
    {
      method: "GET",
      credentials: "include",
    },
    [props.isCommented]
  );

  return (
    <button
      type="button"
      className="justify-center flex items-center gap-1 text-1xl"
    >
      <FaRegComment />
      {data && data.data}
    </button>
  );
}

export default CommentCount;
