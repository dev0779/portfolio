import { Route, Routes } from "react-router-dom";

import { About } from "./../Pages/About/About";
import { Contact } from "./../Pages/Contact/Contact";
import { Home } from "./../Pages/Home/Home";
import { Projects } from "./../Pages/Projects/Projects";
import { LogInPage } from "./../Pages/Log/LogInPage";
import { Designer } from "./../Pages/Designer/Designer";
import { Layout } from "./../Layouts/Layout/Layout";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/designer" element={<Designer />} />
        <Route path="/about" element={<About />} />
        <Route path="professionalprojects"/>
        <Route path="/demoprojects" element={<Projects />}>
          <Route index element={<div>overview</div>}></Route>
          <Route path="product" element={<div>Product</div>} />
          <Route path="dashboard" element={<div>Dashboard</div>} />
          <Route path="budjet" element={<div>Angular</div>} />
        </Route>
        <Route path="/contact" element={<Contact />} />
      </Route>
      <Route path="/login" element={<LogInPage />} />
    </Routes>
  );
};
