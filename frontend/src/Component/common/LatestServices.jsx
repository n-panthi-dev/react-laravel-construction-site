import React, { useEffect, useState } from "react";
import ServiceImg from "../../assets/images/construction1.jpg";
import axios from "axios";
// import ServiceImg from "../assets/images/construction1.jpg";
import { apiurl, imageUrl } from "./http";
import { Link } from "react-router-dom";

const LatestServices = () => {
  const [latestServices, setlatestServices] = useState("");
  const Services = async () => {
    const response = await axios.get(apiurl + "get-latest-services?limit=4", {
      headers: {
        Accept: "application/json",
      },
    });
    if (response.data.status) {
      setlatestServices(response.data.data);
    }
  };
  useEffect(() => {
    Services();
  }, []);

  return (
    <div className="section-3 bg-light py-2">
      <div className="container-fluid py-5">
        <div className="section-header text-center">
          <span>Our Services</span>
          <h2>Comprehensive Construction Solutions</h2>
          <p>
            We offer a wide range of construction services, including
            residential, commercial, and industrial projects and many more. 
          </p>
        </div>
        <div className="row pt-4">
          {latestServices &&
            latestServices.map((latestService) => {
              return (
                <div key={latestService.id} className="col-md-3 col-lg-3">
                  <div className="item">
                    <div className="service-image">
                      <img
                        src={`${imageUrl}uploads/services/small/${latestService.image}`}
                        className="w-100"
                        alt=""
                      />
                    </div>
                    <div className="service-body">
                      <div className="service-title">
                        <h3>{latestService.title} </h3>
                      </div>
                      <div className="service-content">
                        <p>{latestService.short_desc}</p>
                      </div>
                      <Link
                        to={`/services/${latestService.id}`}
                        className="btn btn-primary"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

          {/* <div className="col-md-3 col-lg-3">
            <div className="item">
              <div className="service-image">
                <img src={ServiceImg} className="w-100" alt="" />
              </div>
              <div className="service-body">
                <div className="service-title">
                  <h3>Speciality Construction</h3>
                </div>
                <div className="service-content">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Est, similique.
                  </p>
                </div>
                <a href="" className="btn btn-primary">
                  Read More
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-lg-3">
            <div className="item">
              <div className="service-image">
                <img src={ServiceImg} className="w-100" alt="" />
              </div>
              <div className="service-body">
                <div className="service-title">
                  <h3>Speciality Construction</h3>
                </div>
                <div className="service-content">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Est, similique.
                  </p>
                </div>
                <a href="" className="btn btn-primary">
                  Read More
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-lg-3">
            <div className="item">
              <div className="service-image">
                <img src={ServiceImg} className="w-100" alt="" />
              </div>
              <div className="service-body">
                <div className="service-title">
                  <h3>Speciality Construction</h3>
                </div>
                <div className="service-content">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Est, similique.
                  </p>
                </div>
                <a href="" className="btn btn-primary">
                  Read More
                </a>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LatestServices;
