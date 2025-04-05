import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import { RouteIndex } from "./helpers/RouteName";
import Index from "./pages/Index";

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={RouteIndex} element={<Layout />} />
          {/* <Route index element={<Index />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
