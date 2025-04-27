import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RouteAddCategory, RouteEditCategory } from "@/helpers/RouteName";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import Loading from "@/components/Loading";
import { IoTrashOutline } from "react-icons/io5";
import { showToast } from "@/helpers/showToast";
import { deleteData } from "@/helpers/handleDelete";
import moment from "moment";
import { FaRegComments } from "react-icons/fa";

function Comments() {
  const [refreshData, setRefreshData] = useState(false);
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/comment/get-all-comment`,
    {
      method: "GET",
      credentials: "include",
    },
    [refreshData]
  );

  const handleDelete = async (id) => {
    const response = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/comment/delete/${id}`
    );
    if (response) {
      setRefreshData(!refreshData);
      showToast("success", "Comment deleted successfully");
    } else {
      showToast("error", "Comment deletion failed");
    }
  };
  console.log(data);
  if (loading) return <Loading />;
  return (
    <div>
      <div className="flex items-center gap-3 pl-2 mb-2   text-orange-600">
        <FaRegComments size={26} />
        <h1 className="text-2xl font-bold mt-1">Comments</h1>
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-black-600 font-bold">Date</TableHead>
                <TableHead className="text-black-600 font-bold">Blog</TableHead>
                <TableHead className="text-black-600 font-bold">
                  Commented By
                </TableHead>
                <TableHead className="text-black-600 font-bold">
                  Comment
                </TableHead>
                <TableHead className="text-black-600 font-bold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data && data.data.length > 0 ? (
                data.data.map((comment) => (
                  <TableRow key={comment._id}>
                    <TableCell>{moment(comment.createdAt).fromNow()}</TableCell>
                    <TableCell className="break-words whitespace-normal">
                      {comment.blogid?.title}
                    </TableCell>
                    <TableCell className="break-words whitespace-normal">
                      {comment.user?.name}
                    </TableCell>
                    <TableCell className="break-words whitespace-normal">
                      {comment?.comment}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        onClick={() => handleDelete(comment._id)}
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
                    colSpan={3}
                    className="text-center text-red-500 font-bold"
                  >
                    No Comment Found
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

export default Comments;
