import BlogCard from "@/components/BlogCard";
import Loading from "@/components/Loading";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";

function Index() {
  const {
    data: blogData,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-all`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  if(loading) return <Loading />
  console.log(blogData)
  return (
    <div className="grid grid-cols-3 gap-10">
      {blogData && blogData.data.length > 0
      ?
      blogData.data.map(blog => <BlogCard key={blog._id} props={blog} />)
      :
      <div>Data not found</div>      
      }
    </div>
  )
}

export default Index;
