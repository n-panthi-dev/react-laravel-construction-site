import React, { useEffect, useState } from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Hero from "./common/Hero";
import axios from "axios";
import { apiurl, imageUrl } from "./common/http";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LatestTestimonials from './common/LatestTestimonials';

const ServiceDetail = () => {
  const [service, setService] = useState("");
  const [allservice, setallService] = useState("");
  const params = useParams();

  const fetchService = async () => {
    const response = await axios.get(
      apiurl + "get-single-service/" + params.id,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    console.log(response.data);

    if (response.data.status) {
      setService(response.data.data);
    } else if (!response.data.status) {
      toast.error(response.data.message);
    } else {
      toast.error("Network Error");
    }
  };
  const fetchallService = async () => {
    const response = await axios.get(apiurl + "get-services/", {
      headers: {
        Accept: "application/json",
      },
    });
    console.log(response.data);

    if (response.data.status) {
      setallService(response.data.data);
    } else if (!response.data.status) {
      toast.error(response.data.message);
    } else {
      toast.error("Network Error");
    }
  };
  useEffect(() => {
    fetchService();
    fetchallService();
  }, [params.id]);
  return (
    <div>
      <Header />{" "}
      <main>
        <Hero
          preHeading=" Quality. Integrity. Value."
          heading={service.title}
        />
        <section className="section-10">
          <div className="container py-5">
            <div className="row">
              <div className="col-md-3">
                <div className="card shadow border-0 sidebar">
                  <div className="card-body px-4 py-4">
                    <h3 className="mt-2 mb-3">Our Services</h3>
                    <ul>
                      {allservice &&
                        allservice.map((service) => {
                          return (
                            <li key={service.id}>
                              <Link to={`/services/${service.id}`}>
                                {service.title}{" "}
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
                    src={`${imageUrl}uploads/services/large/${service.image}`}
                    alt=""
                  />
                </div>
                <h3 className="py-3">{service.title}</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: service.content }}
                ></div>
              </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <LatestTestimonials/>
                </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
