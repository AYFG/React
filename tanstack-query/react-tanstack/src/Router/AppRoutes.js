import React from "react";
import { Route, Routes } from "react-router-dom";
import UseQueryPage from "../UseQueryPage";
import InfinityQueryPage from "../InfinityQueryPage";
import InfiniteScroll from "../InfiniteScroll";
import InterObserver from "../InterObserver";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UseQueryPage />} />
      <Route path="/infinity" element={<InfinityQueryPage />} />
      <Route path="/infiniteScroll" element={<InfiniteScroll />} />
    </Routes>
  );
}
