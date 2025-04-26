import CommentCount from "@/components/CommentCount";
import Comments from "@/components/Comments";
import LikeCount from "@/components/LikeCount";
import Loading from "@/components/Loading";
import RelatedBlog from "@/components/RelatedBlog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import { decodeHTML } from "entities";
import moment from "moment";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

function SingleBlogDetails() {
  const { blog, category } = useParams();
  const [isCommented, setIsCommented] = useState(false);
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-blog/${blog}`,
    {
      method: "GET",
      credentials: "include",
    },
    [blog, category]
  );
  if (loading) return <Loading />;
  return (
    <div className="md:flex-nowrap flex-wrap flex justify-between gap-10">
      {data && data.data && (
        <>
          <div className="border rounded md:w-[70%] w-full p-5">
            <h1 className="text-2xl font-bold mb-5">{data.data.title}</h1>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={data.data.author.avatar}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                  />
                </Avatar>
                <div>
                  <p className="font-bold text-gray-600">
                    {data.data.author.name}
                  </p>
                  <p className="font-bold text-gray-500 text-sm">
                    {moment(data.data.createdAt).fromNow()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <LikeCount props={{ blogid: data.data._id }} />
                <CommentCount props={{ blogid: data.data._id, isCommented }} />
              </div>
            </div>

            <div className="my-5">
              <img src={data.data.featuredImage} alt="" className="rounded" />
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: decodeHTML(data.data.blogContent) || "",
              }}
            ></div>
            <div className="border-t mt-5 pt-5">
              <Comments props={{ blogid: data.data._id, isCommented : setIsCommented, isCommentedConst: isCommented }} />
            </div>
          </div>
        </>
      )}

      <div className="h-fit border rounded md:w-[40%] w-full">
        <RelatedBlog props={{ category: category, currentBlog: blog }} />
      </div>
    </div>
  );
}

export default SingleBlogDetails;
