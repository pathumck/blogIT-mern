import BlogCard from "@/components/BlogCard";
import Loading from "@/components/Loading";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import InfiniteScroll from "react-infinite-scroll-component";
import spinner from "../../assets/scroll-spinner.svg";

function BlogByCategory() {
  const { category } = useParams();
  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [fetchUrl, setFetchUrl] = useState(
    `${getEnv(
      "VITE_API_BASE_URL"
    )}/blog/get-blog-by-category/${category}?page=${page}&limit=6`
  );
  const {
    data: blogData,
    loading,
    error,
  } = useFetch(fetchUrl, { method: "GET", credentials: "include" }, [fetchUrl]);

  useEffect(() => {
    if (blogData?.data) {
      if (blogData.data.length === 0) {
        setHasMore(false);
      } else {
        setBlogs((prev) => [...prev, ...blogData.data]);
      }
    }
  }, [blogData]);

  useEffect(() => {
    setPage(1);
    setBlogs([]);
    setHasMore(true);
    setFetchUrl(
      `${getEnv(
        "VITE_API_BASE_URL"
      )}/blog/get-blog-by-category/${category}?page=1&limit=6`
    );
  }, [category, setFetchUrl]);

  const fetchMore = () => {
    setPage((prev) => prev + 1);
    setFetchUrl(
      `${getEnv(
        "VITE_API_BASE_URL"
      )}/blog/get-blog-by-category/${category}?page=${page + 1}&limit=6`
    );
  };

  return (
    <>
      <div className="flex items-center gap-3 pb-2   text-orange-600">
        <BiCategory size={24} />

        <h1 className="text-2xl font-bold">{category}</h1>
      </div>
      <InfiniteScroll
        key={category}
        dataLength={blogs.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center items-center">
            {
              <img
                className={loading && page > 1 ? "w-10 block" : "hidden"}
                src={spinner}
                alt=""
              />
            }
          </div>
        }
        endMessage={
          <p className="text-center pt-5 text-orange-600 font-bold">
            You have seen it all...
          </p>
        }
      >
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {loading && blogs.length === 0 ? (
            <Loading />
          ) : blogs.length > 0 ? (
            blogs.map((blog) => <BlogCard key={blog._id} props={blog} />)
          ) : (
            <div>Data not found</div>
          )}
        </div>
      </InfiniteScroll>
    </>
  );
}

export default BlogByCategory;
