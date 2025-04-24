import BlogCard from "@/components/BlogCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { getEnv } from "@/helpers/getEnv";
import { useState, useEffect } from "react";
import { useFetch } from "@/hooks/useFetch";
import spinner from "../assets/scroll-spinner.svg";

function Index() {
  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/blog?page=${page}&limit=6`,
    { method: "GET", credentials: "include" },
    [page]
  );

  useEffect(() => {
    if (data?.data) {
      if (data.data.length === 0) {
        setHasMore(false);
      } else {
        setBlogs((prev) => [...prev, ...data.data]);
      }
    }
  }, [data]);

  const fetchMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <InfiniteScroll
      dataLength={blogs.length}
      next={fetchMore}
      hasMore={hasMore}
      loader={
        <div className="flex justify-center items-center">
          {<img className="w-10" src={spinner} alt="" />}
        </div>
      }
      endMessage={
        <p className="text-center pt-5 text-orange-600 font-bold">
          You have seen it all...
        </p>
      }
    >
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {blogs.length > 0
          ? blogs.map((blog) => <BlogCard key={blog._id} props={blog} />)
          : !loading && <div>Data not found</div>}
      </div>
    </InfiniteScroll>
  );
}

export default Index;
