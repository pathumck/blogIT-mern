import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import avatar from "@/assets/avatar.png";
import { FaCalendarDays } from "react-icons/fa6";
import moment from "moment";
import { Link } from "react-router-dom";

function BlogCard({ props }) {
  return (
    <Link>
      <Card className="pt-5">
        <CardContent>
          <div className="flex item-center justify-between">
            <div className="flex justify-between items-center gap-2">
              <Avatar>
                <AvatarImage src={props.author.avatar || avatar} />
              </Avatar>
              <span className="text-gray-600 font-bold">
                {props.author.name}
              </span>
            </div>
            {props.author.role === "admin" && (
              <div>
                <Badge variant="outline" className="bg-orange-500">
                  Admin
                </Badge>
              </div>
            )}
          </div>

          <div className="rounded my-2">
            <img src={props.featuredImage} className="rounded" />
          </div>
          <div>
            <p className="flex items-center gap-2 mb-2">
              <FaCalendarDays />
              <span className="text-gray-500 font-semibold">
                {moment(props.createdAt).format("DD-MM-YY")}
              </span>
            </p>
            <h2 className="text-1xl font-bold line-clamp-2">{props.title}</h2>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default BlogCard;
