import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "../components/Home";

export const UserRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Home} />
      </Routes>
    </BrowserRouter>
  );
};
