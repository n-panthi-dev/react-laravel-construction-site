import React, { useMemo, useRef, useState } from "react";
import Header from "../../common/Header";
import Sidebar from "../../common/Sidebar";
import JoditEditor from "jodit-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Footer from "../../common/Footer";
import { apiurl, token } from "../../common/http";
import { toast } from "react-toastify";
import axios from "axios";

const CreateTestimonials = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const [imageId, setImageId] = useState(null);

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Content",
    }),
    [placeholder]
  );

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    // console.log(data);

    const newData = { ...data, imageId: imageId };

    try {
      const response = await axios.post(apiurl + "testimonials/", newData, {
        headers: {
          Authorization: `Bearer ${token()}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.data.status) {
        console.log(response.data);
        navigate("/admin/testimonials");
        toast.success(response.data.message);
      }
      // setServices(response.data);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.status == false
      ) {
        const serverErrors = error.response.data.errors;
        Object.keys(serverErrors).forEach((key) => {
          setError(key, {
            type: "server",
            message: serverErrors[key][0], // Adjust based on your API response
          });
        });
        toast.error(error.response.data.message);
      } else {
        toast.error("Network Error");
      }
    }
  };
  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];

    formData.append("image", file);
    setIsDisable(true);

    try {
      const response = await axios.post(apiurl + "temp-images", formData, {
        headers: {
          Authorization: `Bearer ${token()}`,
          Accept: "application/json",
        },
      });
      setIsDisable(false);
      if (response.data.status) {
        setImageId(response.data.data.id);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        !error.response.data.status
      ) {
        console.log("error");

        toast.error(error.response.data.errors.image[0]);
      }
    }
  };
  return (
    <div>
      {" "}
      <Header />
      <main>
        <div className="container my-5">
          <div className="row">
            <div className="col-md-3">
              {/* Sidebar */}
              <Sidebar />
            </div>
            <div className="col-md-9">
              <div className="card shadow border-0">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between">
                    <h4 className="h5"> Testimonials / Create</h4>
                    <Link to="/admin/testimonials" className="btn btn-primary">
                      Back
                    </Link>
                  </div>
                  <hr />
                  <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Testimonial
                      </label>
                      <textarea
                        placeholder="Testimonial"
                        className={`form-control ${
                          errors.testimonial && "is-invalid"
                        }`}
                        {...register("testimonial", {
                          required: "The Testimonial field is required",
                        })}
                      ></textarea>
                      {errors.testimonial && (
                        <p className="invalid-feedback">
                          {errors.testimonial?.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Citation
                      </label>

                      <input
                        {...register("citation", {
                          required: "Citation field is required",
                        })}
                        type="text"
                        placeholder="Citation"
                        className={`form-control ${
                          errors.citation && "is-invalid"
                        }`}
                      />

                      {errors.citation && (
                        <p className="invalid-feedback">
                          {errors.citation?.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Designation
                      </label>

                      <input
                        {...register("designation")}
                        type="text"
                        placeholder="Designation"
                        className={`form-control`}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Status
                      </label>

                      <select
                        {...register("status")}
                        name=""
                        id=""
                        className="form-control"
                      >
                        <option value="1">Active</option>
                        <option value="0">Block</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Image
                      </label>

                      <br />
                      <input type="file" onChange={handleFile} />
                    </div>

                    <button disabled={isDisable} className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateTestimonials;
