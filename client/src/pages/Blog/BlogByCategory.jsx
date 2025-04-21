import BlogCard from "@/components/BlogCard";
import Loading from "@/components/Loading";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { useParams } from "react-router-dom";
import { BiCategory } from "react-icons/bi";

function BlogByCategory() {
  const { category } = useParams();
  const {
    data: blogData,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-blog-by-category/${category}`,
    {
      method: "GET",
      credentials: "include",
    },
    [category]
  );
  if (loading) return <Loading />;
  return (
    <>
      <div className="flex items-center gap-3 pb-2  text-orange-600">
        <BiCategory size={24} />
        {blogData && blogData.data.length > 0 && (
          <h1 className="text-2xl font-bold">
            {blogData.data[0].category.name}
          </h1>
        )}
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {blogData && blogData.data.length > 0 ? (
          blogData.data.map((blog) => <BlogCard key={blog._id} props={blog} />)
        ) : (
          <div>Data not found</div>
        )}
      </div>
    </>
  );
}

export default BlogByCategory;
