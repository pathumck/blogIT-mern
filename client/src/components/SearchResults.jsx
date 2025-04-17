import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { useSearchParams } from "react-router-dom";
import BlogCard from "./BlogCard";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const {
    data: blogData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/search?q=${q}`, {
    method: "GET",
    credentials: "include",
  }, [q]);
  console.log(blogData);
  return (
    <>
      <div className="flex items-center gap-3 pb-2  text-orange-600">
        <h4 className="text-2xl font-bold text-orange-600">Search Results for : "{q}"</h4>
      </div>
      <div className="grid grid-cols-3 gap-10">
        {blogData && blogData.data.length > 0 ? (
          blogData.data.map((blog) => <BlogCard key={blog._id} props={blog} />)
        ) : (
          <div>Data not found</div>
        )}
      </div>
    </>
  );
}

export default SearchResults;
