import React from "react";
import Header from "./common/Header";
import Hero from "./common/Hero";
import Footer from "./common/Footer";
import { useForm } from "react-hook-form";
import { apiurl } from "./common/http";
import { toast } from "react-toastify";
import axios from "axios";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(apiurl + "contact-now/", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.data.status) {
        // console.log(response.data);
        toast.success(response.data.message);
        reset();
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(
          error.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      }
    }
  };
  return (
    <div>
      <Header />
      <main>
        {/* Hero Section */}
        <Hero
          preHeading=" Quality. Integrity. Value."
          heading="Contact Us"
          text="Get in touch with us for inquiries, project consultations, and more. <br/>
        We're here to assist you with all your construction needs."
        />

        <section className="section-9 py-5">
          <div className="container py-5">
            <div className="section-header text-center">
              {/* <span>Contact Us</span> */}
              <h2>Contact Us</h2>
              <p>
                Have questions or need assistance? We're here to help! <br />
                Reach out for inquiries or to discuss your next project.
              </p>
            </div>

            <div>
              <div className="row mt-5">
                <div className="col-md-3">
                  <div className="card  shadow border-0 mb-5">
                    <div className="card-body rounded-full">
                      <h3>Call Us</h3>
                      <a href="#">{9800000000}</a>
                      <br />
                      <a href="#">{9800000000}</a>
                    </div>
                    <div className="card-body py-0">
                      <h3>You can write Us</h3>
                      <a href="#">example@test.com</a>
                      <br />
                      <a href="#">example@info.com</a>
                    </div>
                    <div className="card-body py-0">
                      <h3>Address</h3>
                      <p href="#">
                        Butwal, Rupandehi
                        <br /> Nepal
                      </p>
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d474.8393560985104!2d83.40910869236752!3d27.682037570101826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1727264699030!5m2!1sen!2snp"
                        width="100%%"
                        height="auto"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="card  shadow border-0">
                    <div className="card-body p-5">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                          <div className="col-md-6 mb-4 ">
                            <label htmlFor="" className="form-label">
                              Name
                            </label>
                            <input
                              type="text"
                              {...register("name", {
                                required: "Name field is required",
                              })}
                              className={`form-control ${
                                errors.name && "is-invalid"
                              }`}
                              placeholder="Enter Name"
                            />
                            {errors.name && (
                              <p className="invalid-feedback">
                                {errors.name?.message}
                              </p>
                            )}
                          </div>
                          <div className="col-md-6 mb-4">
                            <label htmlFor="" className="form-label">
                              Email
                            </label>
                            <input
                              type="email"
                              {...register("email", {
                                required: "This field is required",
                                pattern: {
                                  value: /^\S+@\S+$/i, // Simple email validation pattern
                                  message: "Invalid email address",
                                },
                              })}
                              className={`form-control ${
                                errors.email && "is-invalid"
                              }`}
                              placeholder="Enter Email"
                            />
                            {errors.email && (
                              <p className="invalid-feedback">
                                {errors.email?.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <label htmlFor="" className="form-label">
                              Phone
                            </label>
                            <input
                              type="text"
                              {...register("phone")}
                              className="form-control form-control-lg"
                              placeholder="Phone Number"
                            />
                          </div>
                          <div className="col-md-6 mb-4">
                            <label htmlFor="" className="form-label">
                              Subject
                            </label>
                            <input
                              type="text"
                              {...register("subject")}
                              className="form-control form-control-lg"
                              placeholder="Enter Subject"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 mb-4">
                            <label htmlFor="" className="form-label">
                              Message
                            </label>
                            <textarea
                              rows={5}
                              placeholder="Write a message"
                              {...register("message")}
                              className="form-control form-control-lg"
                            ></textarea>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary large mt-3"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};
export default ContactUs;
