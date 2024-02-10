import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Details from "@/pages/Details";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:name" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}
