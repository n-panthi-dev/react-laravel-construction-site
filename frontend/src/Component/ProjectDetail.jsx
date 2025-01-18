import React, { useEffect, useState } from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Hero from "./common/Hero";
import axios from "axios";
import { apiurl, imageUrl } from "./common/http";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LatestTestimonials from "./common/LatestTestimonials";

const ProjectDetail = () => {
  const [project, setProject] = useState("");
  const [allproject, setallProject] = useState("");
  const params = useParams();

  const fetchProject = async () => {
    const response = await axios.get(
      apiurl + "get-single-project/" + params.id,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    console.log(response.data);

    if (response.data.status) {
      setProject(response.data.data);
    } else if (!response.data.status) {
      toast.error(response.data.message);
    } else {
      toast.error("Network Error");
    }
  };
  const fetchallProject = async () => {
    const response = await axios.get(apiurl + "get-projects/", {
      headers: {
        Accept: "application/json",
      },
    });
    console.log(response.data);

    if (response.data.status) {
      setallProject(response.data.data);
    } else if (!response.data.status) {
      toast.error(response.data.message);
    } else {
      toast.error("Network Error");
    }
  };
  useEffect(() => {
    fetchProject();
    fetchallProject();
  }, [params.id]);
  return (
    <div>
      <Header />{" "}
      <main>
        <Hero
          preHeading=" Quality. Integrity. Value."
          heading={project.title}
        />
        <section className="section-10">
          <div className="container py-5">
            <div className="row">
              <div className="col-md-3">
                <div className="card shadow border-0 sidebar">
                  <div className="card-body px-4 py-4">
                    <h3 className="mt-2 mb-3">Our Services</h3>
                    <ul>
                      {allproject &&
                        allproject.map((project) => {
                          return (
                            <li key={project.id}>
                              <Link to={`/projects/${project.id}`}>
                                {project.title}{" "}
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div>
                  <img
                    className="w-100"
                    src={`${imageUrl}uploads/projects/large/${project.imageid}`}
                    alt=""
                  />
                </div>
                <h3 className="py-3">{project.title}</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: project.content }}
                ></div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <LatestTestimonials />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
