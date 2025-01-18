import React, { useEffect, useState } from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Hero from "./common/Hero";

import Constructionimg from "../assets/images/construction2.jpg";
import { toast } from "react-toastify";
import { apiurl, imageUrl } from "./common/http";
import axios from "axios";
import { Link } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState("");

  const fetchProjects = async () => {
    try {
      const response = await axios.get(apiurl + "get-latest-projects  ", {
        headers: {
          Accept: "application/json",
        },
      });

      if (response.data.status) {
        setProjects(response.data.data);
      }
    } catch (error) {
      toast.error("Network Error");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <Header />
      <main>
        {/* Hero Section */}
        <Hero
          preHeading=" Quality. Integrity. Value."
          heading="Our Projects"
          text="Explore our diverse portfolio of successful projects, showcasing innovation and quality. <br/>
        We bring your vision to life with precision and excellence."
        />

        {/* Our Projects section */}
        <div className="section-3 bg-light py-5">
          <div className="container py-5">
            <div className="section-header text-center">
              <span>Our projects</span>
              <h2>Discover our diverse range of projects</h2>
              <p>
                From modern residential complexes to large-scale commercial
                developments, our projects showcase innovation, quality, <br />
                and sustainability. Each endeavor reflects our commitment to
                excellence and attention to detail.
              </p>
            </div>
            <div className="row pt-4">
              {projects &&
                projects.map((project) => {
                  return (
                    <div className="col-md-4 col-lg-4">
                      <div className="item">
                        <div className="service-image">
                          <img
                            src={`${imageUrl}uploads/projects/small/${project.imageid}`}
                            className="w-100"
                            alt=""
                          />
                        </div>
                        <div className="service-body">
                          <div className="service-title">
                            <h3>{project.title}</h3>
                          </div>
                          <div className="service-content">
                            <p>{project.short_desc}</p>
                          </div>
                          <Link
                            to={`/projects/${project.id}`}
                            className="btn btn-primary"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
