import React, { useEffect, useState } from "react";
import Header from "./common/Header";
import Hero from "./common/Hero";
import Footer from "./common/Footer";

import ServiceImg from "../assets/images/construction1.jpg";
import { apiurl, imageUrl } from "./common/http";
import axios from "axios";
import { Link } from "react-router-dom";

const Services = () => {
  const [latestServices, setlatestServices] = useState("");
  const Services = async () => {
    const response = await axios.get(apiurl + "get-services", {
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
    <div>
      <Header />
      <main>
        <Hero
          preHeading=" Quality. Integrity. Value."
          heading="Services"
          text="We offer a range of expert services focused on delivering quality and value. <br/>
          From design to execution, we ensure exceptional results every time."
        />

        <div className="section-3 bg-light py-2">
          <div className="container py-5">
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
                    <div key={latestService.id} className="col-md-4 col-lg-4">
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
                            <h3>{latestService.title}</h3>
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
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
