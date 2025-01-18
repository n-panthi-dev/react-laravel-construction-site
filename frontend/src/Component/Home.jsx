import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Header from "./common/Header";
import Footer from "./common/Footer";

import Icon1 from "../assets/images/icon-1.svg";
import Icon2 from "../assets/images/icon-2.svg";
import Icon3 from "../assets/images/icon-3.svg";
import About from "./common/About";
import LatestServices from "./common/LatestServices";
import LatestProjects from "./common/LatestProjects";
import LatestArticle from "./common/LatestArticle";
import LatestTestimonials from "./common/LatestTestimonials";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Header />
      <main>
        {/* hero section */}
        <section className="section-1">
          <div className="hero d-flex align-items-center">
            <div className="container-fluid">
              <div className="text-center">
                <span>Welcome Amazing Constructions</span>
                <h1>
                  Crafting dreams with <br /> precision and excellence.
                </h1>
                <p>
                  Our construction offers high-quality, durable, and modern
                  infrastructure solutions tailored to meet diverse urban needs.{" "}
                  <br />
                  We prioritize sustainability, innovation, and excellence in
                  every project we undertake.
                </p>

                <div className="mt-4">
                  <Link to="/contact" className="btn btn-primary">
                    Contact Now
                  </Link>
                  <Link to={"/project"} className="ms-3 btn btn-secondary ">
                    View Projects
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* about us section */}
        <About />
        {/* Our Services section */}
        <LatestServices />
        {/* why choose us */}
        <div className="section-4 bg-light py-5">
          <div className="container">
            <div className="section-header text-center">
              <span>Why Choose Us</span>
              <h2>Discover our diverse range of projects</h2>
              <p>
                We bring creativity and functionality together, offering
                cutting-edge architectural designs tailored to modern needs.
              </p>
            </div>
            <div className="row pt-4">
              <div className="col-md-4">
                <div className="card shadow border-0 p-4">
                  <div className="card-icon">
                    <img src={Icon1} alt="" />
                  </div>
                  <div className="card-title mt-3">
                    <h3>Cutting-Edge Solutions</h3>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Consequuntur eum architecto dolorum.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow border-0 p-4">
                  <div className="card-icon">
                    <img src={Icon2} alt="" />
                  </div>
                  <div className="card-title mt-3">
                    <h3>Cutting-Edge Solutions</h3>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Consequuntur eum architecto dolorum.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow border-0 p-4">
                  <div className="card-icon">
                    <img src={Icon3} alt="" />
                  </div>
                  <div className="card-title mt-3">
                    <h3>Cutting-Edge Solutions</h3>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Consequuntur eum architecto dolorum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Our Projects section */}

        <LatestProjects />
        {/* Testimonials */}
        <LatestTestimonials />
        {/* Blogs  */}
        <LatestArticle />
      </main>
      <Footer />
    </>
  );
};

export default Home;
