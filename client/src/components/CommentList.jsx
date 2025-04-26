import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import avatar from "../assets/avatar.png";
import moment from "moment/moment";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import spinner from "../assets/scroll-spinner.svg";
function CommentList({ props }) {
  const user = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [comments, setComments] = useState([]);
  const [isCommented, setIsCommented] = useState(false);
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/comment/get/${
      props.blogid
    }?page=${page}&limit=3`,
    {
      method: "GET",
      credentials: "include",
    },
    [page, isCommented]
  );

  const {
    data: commentCount,
    loading: commentCountLoading,
    error: commentCountError,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/comment/get-count/${props.blogid}`,
    {
      method: "GET",
      credentials: "include",
    },
    [props.isCommented]
  );

  const fetchMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (data?.data) {
      if (data.data.length === 0) {
        setHasMore(false);
      } else {
        setComments((prev) => [...prev, ...data.data]);
      }
    }
  }, [data]);

  useEffect(() => {
    if (props.isCommented) {
      setPage(1);
      setComments([]);
      setHasMore(true);
      setIsCommented((prev) => !prev);
    }
  }, [props.isCommented]);

  console.log(props.isCommented, "isCommented");
  console.log(page, "page");
  console.log(hasMore, "hasMore");
  console.log(comments, "comments");

  return (
    <div>
      <h4 className="text-2xl font-bold">
        <span className="me-2">{(commentCount && commentCount.data) || 0}</span>{" "}
        Comments
      </h4>

      <div id="comments" className="max-h-[200px] overflow-y-auto">
        <InfiniteScroll
          dataLength={comments.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center items-center">
              {
                <img
                  className={loading ? "w-10 block" : "hidden"}
                  src={spinner}
                  alt=""
                />
              }
            </div>
          }
          endMessage={
            commentCount &&
            commentCount.data > 0 && (
              <p className="text-center pt-5 text-orange-600 font-bold">
                You have seen it all...
              </p>
            )
          }
          scrollableTarget="comments"
        >
          <div className="mt-5">
            {data &&
              comments.length > 0 &&
              comments.map((comment) => {
                return (
                  <div key={comment._id} className="flex gap-2">
                    <Avatar>
                      <AvatarImage
                        src={comment?.user.avatar || avatar}
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                      />
                    </Avatar>
                    <div className="border-b">
                      <p className="font-bold">{comment?.user.name}</p>
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
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default CommentList;
