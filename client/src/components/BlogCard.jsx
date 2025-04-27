import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import avatar from "@/assets/avatar.png";
import { FaCalendarDays } from "react-icons/fa6";
import moment from "moment";
import { Link } from "react-router-dom";
import { RouteBlogDetails } from "@/helpers/RouteName";

function BlogCard({ props }) {
  return (
    <Link to={RouteBlogDetails(props.category.slug, props.slug)}>
      <Card className="pt-5 hover:bg-gray-50 hover:shadow-lg transition-all">
        <CardContent>
          <div className="flex item-center justify-between">
            <div className="flex justify-between items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={props.author?.avatar || avatar}
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                />
              </Avatar>
              <span className="text-gray-600 font-bold line-clamp-1">
                {props.author?.name}
              </span>
            </div>
            {props.author?.role === "admin" && (
              <div>
                <Badge variant="outline" className="bg-orange-500">
                  Admin
                </Badge>
              </div>
            )}
          </div>

          <div className="rounded my-2 aspect-[4/3]">
            <img
              src={props.featuredImage}
              className="rounded w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="flex items-center gap-2 mb-2">
              <FaCalendarDays />
              <span className="text-gray-500 font-semibold">
                {moment(props.createdAt).fromNow()}
              </span>
            </p>
            <h2 className="text-1xl font-bold line-clamp-1">{props.title}</h2>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default BlogCard;
