import { Route, Routes } from "react-router-dom";

import { About } from "./Pages/About";
import { Contact } from "./Pages/Contact";
import { Home } from "./Pages/Home";
import { Projects } from "./Pages/Projects";
import { LogInPage } from "./Pages/LogInPage";
import { Designer } from "./Pages/Designer";
import { Layout } from "./Layouts/Layout/Layout";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/designer" element={<Designer />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      <Route path="/login" element={<LogInPage />} />
    </Routes>
  );
};
