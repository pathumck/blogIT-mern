import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { RouteBlogAdd, RouteBlogEdit } from "@/helpers/RouteName";
import { getEnv } from "@/helpers/getEnv";
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";
import Loading from "@/components/Loading";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { useFetch } from "@/hooks/useFetch";
import moment from "moment";
import { FaBlogger } from "react-icons/fa";
function BlogDetails() {
  const [refreshData, setRefreshData] = useState(false);
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
    [refreshData]
  );

  const handleDelete = async (id) => {
    const response = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/blog/delete/${id}`
    );
    if (response) {
      setRefreshData(!refreshData);
      showToast("success", "Blog deleted successfully");
    } else {
      showToast("error", "Blog deletion failed");
    }
  };
  if (loading) return <Loading />;

  return (
    <div>
      <div className="flex items-center gap-3 pl-2 mb-2   text-orange-600">
        <FaBlogger size={26} />
        <h1 className="text-2xl font-bold mt-1">Blogs</h1>
      </div>
      <Card>
        <CardHeader>
          <div>
            <Button>
              <Link to={RouteBlogAdd}>Add Blog</Link>
            </Button>
          </div>
        </CardHeader>{" "}
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-black-600 font-bold">
                  Author
                </TableHead>
                <TableHead className="text-black-600 font-bold">
                  Category Name
                </TableHead>
                <TableHead className="text-black-600 font-bold">
                  Title
                </TableHead>
                <TableHead className="text-black-600 font-bold">Slug</TableHead>
                <TableHead className="text-black-600 font-bold">
                  Dated
                </TableHead>
                <TableHead className="text-black-600 font-bold">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogData.data && blogData.data.length > 0 ? (
                blogData.data.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell>{blog?.author?.name}</TableCell>
                    <TableCell>{blog?.category?.name}</TableCell>
                    <TableCell className="break-words whitespace-normal">
                      {blog?.title}
                    </TableCell>
                    <TableCell className="break-words whitespace-normal">
                      {blog?.slug}
                    </TableCell>
                    <TableCell>
                      {moment(blog?.createdAt).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        variant="outline"
                        className="hover:bg-orange-400 hover:text-white"
                        asChild
                      >
                        <Link to={RouteBlogEdit(blog._id)}>
                          <FaRegEdit />
                        </Link>
                      </Button>
                      <Button
                        onClick={() => handleDelete(blog._id)}
                        variant="outline"
                        className="hover:bg-orange-400 hover:text-white cursor-pointer"
                      >
                        <IoTrashOutline />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-red-500 font-bold"
                  >
                    No Blog Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default BlogDetails;
