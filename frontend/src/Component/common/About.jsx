import React from "react";
import AboutImg from "../../assets/images/about-us.jpg";

function About() {
  return (
    <>
      <div className="section-2 py-5">
        <div className="container py-0">
          <div className="row">
            <div className="col-md-12 col-lg-6 py-5">
              <img
                src={AboutImg}
                className="w-100"
                style={{ borderRadius: "40px" }}
              />
            </div>
            <div className="col-md-12 col-lg-6 py-5">
              <span>About Us</span>
              <h2>Building the Future, Restoring the Past.</h2>
              <p>
                We are a leading construction company dedicated to transforming
                urban landscapes with cutting-edge designs and sustainable
                practices. Our mission is to create spaces that inspire and
                endure for generations to come.
              </p>
              <p>
                With a commitment to quality and innovation, we deliver
                customized solutions tailored to meet the unique needs of our
                clients. From modern infrastructure to timeless architectural
                marvels, we bring your vision to life with precision and
                excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
