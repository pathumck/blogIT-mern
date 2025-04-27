import { TfiComments } from "react-icons/tfi";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RouteSignIn } from "@/helpers/RouteName";
import CommentList from "./CommentList";
function Comments({ props }) {
  const user = useSelector((state) => state.user);
  const formSchema = z.object({
    comment: z.string().min(3, "Comment must be at least 3 characters long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });
  async function onSubmit(values) {
    props.isCommented(false);
    try {
      const newValues = {
        ...values,
        blogid: props.blogid,
        user: user.user._id,
      };
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/comment/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(newValues),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        showToast("error", data.message);
        return;
      }
      props.isCommented(true);
      form.reset();
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }
  return (
    <div>
      <h4 className="flex items-center gap-2 text-2xl font-bold text-gray-600 mb-2">
        <TfiComments className="text-orange-500" />
        Comments
      </h4>
      {user && user.isLoggedIn ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Type your comment" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="mt-1">
              Submit
            </Button>
          </form>
        </Form>
      ) : (
        <Button asChild>
          <Link to={RouteSignIn}>Sign In</Link>
        </Button>
      )}

      <div className="border-t mt-5 pt-5">
        <CommentList
          props={{ blogid: props.blogid, isCommented: props.isCommentedConst }}
        />
      </div>
    </div>
  );
}

export default Comments;
