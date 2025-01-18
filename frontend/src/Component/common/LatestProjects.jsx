import React, { useEffect, useState } from "react";
import Constructionimg from "../../assets/images/construction2.jpg";
import axios from "axios";
import { apiurl, imageUrl } from "./http";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const LatestProjects = () => {
  const [latestProjects, setLatestProjects] = useState("");

  const fetchLatestPorjects = async () => {
    try {
      const response = await axios.get(apiurl + "get-latest-projects?limit=4", {
        headers: {
          Accept: "application/json",
        },
      });

      if (response.data.status) {
        setLatestProjects(response.data.data);
      }
    } catch (error) {
      toast.error("Network Error");
    }
  };

  useEffect(() => {
    fetchLatestPorjects();
  }, []);
  return (
    <div className="section-3 bg-light py-5">
      <div className="container-fluid py-5">
        <div className="section-header text-center">
          <span>Our projects</span>
          <h2>Discover our diverse range of projects</h2>
          <p>
            From modern residential complexes to large-scale commercial
            developments, our projects showcase innovation, quality, <br />and
            sustainability. Each endeavor reflects our commitment to excellence
            and attention to detail.
          </p>
        </div>
        <div className="row pt-4">
          {latestProjects &&
            latestProjects.map((project) => {
              return (
                <div className="col-md-3 col-lg-3" key={project.id}>
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
  );
};

export default LatestProjects;
