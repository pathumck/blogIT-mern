import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getEnv } from "@/helpers/getEnv";
import { RouteBlog } from "@/helpers/RouteName";
import { showToast } from "@/helpers/showToast";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetch } from "@/hooks/useFetch";
import Dropzone from "react-dropzone";
import { FaPlus } from "react-icons/fa";
import Editor from "@/components/Editor";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddBlog() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const {
    data: categoryData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/category/all-category`, {
    method: "GET",
    credentials: "include",
  });

  const [filePreview, setPreview] = useState();
  const [file, setFile] = useState(null);

  const formSchema = z.object({
    category: z.string().min(3, "Category must be at least 3 characters long"),
    title: z.string().min(3, "Title must be at least 3 characters long"),
    slug: z.string().min(3, "Slug must be at least 3 characters long"),
    blogContent: z
      .string()
      .min(3, "Blog Content must be at least 3 characters long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      title: "",
      slug: "",
      blogContent: "",
    },
  });

  const handleEditorData = (event, editor) => {
    const data = editor.getData();
    form.setValue("blogContent", data);
  };

  useEffect(() => {
    const blogTitle = form.watch("title");

    const slug = blogTitle ? slugify(blogTitle, { lower: true }) : "";

    form.setValue("slug", slug);
  }, [form.watch("title")]);

  async function onSubmit(values) {
    try {
      const newValues = { ...values, author: user._id };

      if (!file) {
        showToast("error", "Feature Image is required");
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify(newValues));
      const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/blog/add`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        showToast("error", data.message);
        return;
      }
      form.reset();
      setFile();
      setPreview();
      navigate(RouteBlog);

      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }

  const handleFileSelection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setPreview(preview);
  };
  return (
    <div>
      <div className="flex items-center gap-3 pl-2 mb-2   text-orange-600">
        <h1 className="text-2xl font-bold mt-1">Add Blog</h1>
      </div>
      <Card className="pt-5 max-w-screen mx-auto">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 font-semibold">
                        Category
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categoryData &&
                              categoryData.data.length > 0 &&
                              categoryData.data.map((category) => (
                                <SelectItem
                                  key={category._id}
                                  value={category._id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 font-semibold">
                        Title
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter blog title" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 font-semibold">
                        Slug
                      </FormLabel>
                      <FormControl>
                        <Input disabled placeholder="Slug" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-5">
                <span className="text-gray-600 font-semibold">
                  Featured Image
                </span>
                <Dropzone
                  onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div>
                      <input {...getInputProps()} />
                      <div
                        {...getRootProps()}
                        className="flex justify-center items-center w-36 h-28 border-2 border-dashed border-gray-400 rounded"
                      >
                        {filePreview ? (
                          <img
                            src={filePreview}
                            className="w-full h-full object-contain"
                            alt=""
                          />
                        ) : (
                          <FaPlus />
                        )}
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="blogContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 font-semibold">
                        Blog Content
                      </FormLabel>
                      <FormControl>
                        <div className="overflow-auto border rounded p-2">
                          <Editor
                            props={{
                              initialData: "",
                              onChange: handleEditorData,
                            }}
                          />
                        </div>
                      </FormControl>

                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddBlog;
