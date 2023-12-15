import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/page/:page" element={<App />} />
        <Route path="/page/:page/search/:search" element={<App />} />
        <Route path="/page/:page/filter/:filter" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
