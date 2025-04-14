import React from "react";
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
import { RouteBlogAdd } from "@/helpers/RouteName";
function BlogDetails() {
  return (
    <div>
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
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Category Name</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Dated</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            {/* <TableBody>
              {categoryData.data && categoryData.data.length > 0 ? (
                categoryData.data.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        variant="outline"
                        className="hover:bg-orange-400 hover:text-white"
                        asChild
                      >
                        <Link to={RouteEditCategory(category._id)}>
                          <FaRegEdit />
                        </Link>
                      </Button>
                      <Button
                        onClick={() => handleDelete(category._id)}
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
                    No Category Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody> */}
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default BlogDetails;
