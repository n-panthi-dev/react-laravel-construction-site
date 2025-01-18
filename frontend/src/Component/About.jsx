import React from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";

import { default as Aboutnew } from "./common/About";

import Hero from "./common/Hero";
import LatestTestimonials from "./common/LatestTestimonials";
import Team from "./common/Team";

const About = () => {
  return (
    <div>
      <Header />
      <main>
        {/* about us section */}
        <Hero
          preHeading=" Quality. Integrity. Value."
          heading="About Us"
          text="Delivering exceptional construction services with a focus on quality and integrity. <br/>
        Building projects that last and exceed expectations."
        />

        {/* default about */}
        <Aboutnew />
        {/* our team */}
        <Team />
        <LatestTestimonials />
      </main>
      <Footer />
    </div>
  );
};

export default About;
