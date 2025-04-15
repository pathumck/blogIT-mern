import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import Loading from "./Loading";
import { Avatar, AvatarImage } from "./ui/avatar";
import avatar from "../assets/avatar.png";
import moment from "moment/moment";
import { useSelector } from "react-redux";

function CommentList({ props }) {
  const user = useSelector((state) => state.user);
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/comment/get/${props.blogid}`,
    {
      method: "GET",
      credentials: "include",
    }
  ); 
  if (loading) return <Loading />;
  return (
    <div>
      <h4 className="text-2xl font-bold">
        {props.newComment ? (
          <span className="me-2">{data && data.data.length + 1}</span>
        ) : (
          <span className="me-2">{data && data.data.length}</span>
        )}{" "}
        Comments
      </h4>
      <div className="mt-5">
        {props.newComment && (
          <div className="flex gap-2">
            <Avatar>
              <AvatarImage src={user?.user?.avatar || avatar} />
            </Avatar>
            <div className="border-b">
              <p className="font-bold">{user?.user?.name}</p>
              <p className="text-sm text-gray-500">
                {moment(props.newComment?.createdAt).fromNow()}
              </p>
              <div className="pt-3 pb-3 text-gray-600 text-sm font-semibold">
                {props.newComment?.comment}
              </div>
            </div>
          </div>
        )}

        {data &&
          data.data.length > 0 &&
          data.data.map((comment) => {
            return (
              <div key={comment._id} className="flex gap-2">
                <Avatar>
                  <AvatarImage src={comment?.author.avatar || avatar} />
                </Avatar>
                <div className="border-b">
                  <p className="font-bold">{comment?.author.name}</p>
                  <p className="text-sm text-gray-500">
                    {moment(comment.createdAt).fromNow()}
                  </p>
                  <div className="pt-3 pb-3 text-gray-600 text-sm font-semibold">
                    {comment.comment}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default CommentList;
