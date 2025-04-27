import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { RouteBlogDetails } from "@/helpers/RouteName";

function RelatedBlog({ props }) {
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-related-blog/${props.category}/${
      props.currentBlog
    }`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (loading) return <Loading />;
  return (
    <div className="mx-5">
      <h4 className="text-2xl font-bold my-5 text-center">Related Blogs</h4>
      <div>
        {data && data.data.length > 0 ? (
          data.data.map((blog) => (
            <Link
              key={blog._id}
              to={RouteBlogDetails(props.category, blog.slug)}
            >
              <div className="flex items-center gap-2 mb-3 hover:bg-gray-100 transition ">
                <img
                  src={blog.featuredImage}
                  alt=""
                  className="w-[100px] h-[70px] object-cover rounded-md"
                />
                <h4 className="line-clamp-2 text-md font-semibold">
                  {blog.title}
                </h4>
              </div>
            </Link>
          ))
        ) : (
          <div>No related blog</div>
        )}
      </div>
    </div>
  );
}

export default RelatedBlog;
