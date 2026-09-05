import { PageContainer } from "@/shared/PageContainer/PageContainer";
import { Tabs } from "@/shared/Tabs/Tabs";
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import "./Projects.scss";

const projects = [
  {
    label: "home",
    path: "/demoprojects",
  },
  {
    label: "Product",
    path: "/demoprojects/product",
  },
  {
    label: "Dashboard",
    path: "/demoprojects/dashboard",
  },
  {
    label: "Budjet",
    path: "/demoprojects/budjet",
  },
];

export const Projects = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const active = projects.findIndex(
    (project) => project.path === location.pathname,
  );

  return (
    <PageContainer>
      <div className="projects">
        <div className="projects__nav">
          <Tabs
            options={projects}
            activeIndex={active}
            onClick={(index) => navigate(projects[index].path)}
          />
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </PageContainer>
  );
};
