import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import {
  RouteAddCategory,
  RouteBlog,
  RouteBlogAdd,
  RouteBlogByCategory,
  RouteBlogDetails,
  RouteBlogEdit,
  RouteCategoryDetails,
  RouteCommentDetails,
  RouteEditCategory,
  RouteIndex,
  RouteProfile,
  RouteSearch,
  RouteSignIn,
  RouteSignUp,
  RouteUser,
} from "./helpers/RouteName";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Index from "./pages/Index";
import AddCategory from "./pages/Category/AddCategory";
import CategoryDetails from "./pages/Category/CategoryDetails";
import EditCategory from "./pages/Category/EditCategory";
import AddBlog from "./pages/Blog/AddBlog";
import BlogDetails from "./pages/Blog/BlogDetails";
import EditBlog from "./pages/Blog/EditBlog";
import SingleBlogDetails from "./pages/SingleBlogDetails";
import BlogByCategory from "./pages/Blog/BlogByCategory";
import SearchResults from "./components/SearchResults";
import Comments from "./pages/Comments";
import Users from "./pages/Users";
import AuthRouteProtection from "./components/AuthRouteProtection";
import OnlyAdminAllowed from "./components/OnlyAdminAllowed";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={RouteIndex} element={<Layout />}>
            <Route index element={<Index />} />

            <Route path={RouteBlogDetails()} element={<SingleBlogDetails />} />
            <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />
            <Route path={RouteSearch()} element={<SearchResults />} />

            <Route element={<AuthRouteProtection />}>
              <Route path={RouteBlogAdd} element={<AddBlog />} />
              <Route path={RouteBlog} element={<BlogDetails />} />
              <Route path={RouteBlogEdit()} element={<EditBlog />} />
              <Route path={RouteCommentDetails} element={<Comments />} />
              <Route path={RouteProfile} element={<Profile />} />
            </Route>

            <Route element={<OnlyAdminAllowed />}>
              <Route path={RouteAddCategory} element={<AddCategory />} />
              <Route
                path={RouteCategoryDetails}
                element={<CategoryDetails />}
              />
              <Route path={RouteEditCategory()} element={<EditCategory />} />
              <Route path={RouteUser} element={<Users />} />
            </Route>
          </Route>

          <Route path={RouteSignIn} element={<SignIn />} />
          <Route path={RouteSignUp} element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
