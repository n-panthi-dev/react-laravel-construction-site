import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Component/Home";
import About from "../Component/About";
import Services from "../Component/Services";
import Projects from "../Component/Projects";
import Blogs from "../Component/Blogs";
import ContactUs from "../Component/ContactUs";
import Login from "../Component/Auth/Login";
import DashBoard from "../Component/Auth/DashBoard";
import RequireAuth from "../Component/common/RequireAuth";
import { default as ShowServices } from "../Component/Auth/Services/Show";
import CreateService from "../Component/Auth/Services/CreateService";
import EditService from "../Component/Auth/Services/EditService";
import { default as ShowProjects } from "../Component/Auth/Projects/Show";
import CreateProjects from "../Component/Auth/Projects/CreateProjects";
import EditProjects from "../Component/Auth/Projects/EditProjects";
import ShowArticles from "../Component/Auth/Articles/ShowArticles";
import CreateArticles from "../Component/Auth/Articles/CreateArticles";
import EditArticles from "../Component/Auth/Articles/EditArticles";
import ShowTestimonials from "../Component/Auth/Testimonials/ShowTestimonials";
import CreateTestimonials from "../Component/Auth/Testimonials/CreateTestimonials";
import EditTestimonials from "../Component/Auth/Testimonials/EditTestimonials";
import ShowMember from "../Component/Auth/Member/ShowMember";
import CreateMember from "../Component/Auth/Member/CreateMember";
import EditMember from "../Component/Auth/Member/EditMember";
import ServiceDetail from "../Component/ServiceDetail";
import ProjectDetail from "../Component/ProjectDetail";
import BlogDetail from "../Component/BlogDetail";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/project" element={<Projects />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />

        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <RequireAuth>
              <DashBoard />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/services"
          element={
            <RequireAuth>
              <ShowServices />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/services/create"
          element={
            <RequireAuth>
              <CreateService />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/services/edit/:id"
          element={
            <RequireAuth>
              <EditService />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/projects/"
          element={
            <RequireAuth>
              <ShowProjects />
            </RequireAuth>
          }
        />

        <Route
          path="/admin/projects/create"
          element={
            <RequireAuth>
              <CreateProjects />
            </RequireAuth>
          }
        />

        <Route
          path="/admin/projects/edit/:id"
          element={
            <RequireAuth>
              <EditProjects />
            </RequireAuth>
          }
        />

        <Route
          path="/admin/articles/"
          element={
            <RequireAuth>
              <ShowArticles />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/articles/create"
          element={
            <RequireAuth>
              <CreateArticles />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/articles/edit/:id"
          element={
            <RequireAuth>
              <EditArticles />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/testimonials"
          element={
            <RequireAuth>
              <ShowTestimonials />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/testimonials/create"
          element={
            <RequireAuth>
              <CreateTestimonials />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/testimonials/edit/:id"
          element={
            <RequireAuth>
              <EditTestimonials />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/members"
          element={
            <RequireAuth>
              <ShowMember />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/members/create"
          element={
            <RequireAuth>
              <CreateMember />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/members/edit/:id"
          element={
            <RequireAuth>
              <EditMember />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
};

export default Routing;
