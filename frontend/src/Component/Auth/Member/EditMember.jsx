import React, { useMemo, useRef, useState } from "react";
import Header from "../../common/Header";
import Sidebar from "../../common/Sidebar";
import JoditEditor from "jodit-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Footer from "../../common/Footer";
import { apiurl, imageUrl, token } from "../../common/http";
import { toast } from "react-toastify";
import axios from "axios";

const EditMember = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [member, setMember] = useState("");
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
  const params = useParams();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const response = await axios.get(apiurl + "member/" + params.id, {
        headers: {
          Authorization: `Bearer ${token()}`,
          Accept: "application/json",
        },
      });

      // console.log(response.data);
      setMember(response.data.data);
      setContent(response.data.data.content);
      return {
        name: response.data.data.name,
        job_title: response.data.data.job_title,
        linkedin_url: response.data.data.linkedin_url,
        status: response.data.data.status,
      };
    },
  });
  const onSubmit = async (data) => {
    // console.log(data);

    const newData = { ...data, imageId: imageId };

    try {
      const response = await axios.put(apiurl + "member/" + params.id, newData, {
        headers: {
          Authorization: `Bearer ${token()}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.data.status) {
        console.log(response.data);
        navigate("/admin/members");
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
                    <h4 className="h5"> Member / Create</h4>
                    <Link to="/admin/articles" className="btn btn-primary">
                      Back
                    </Link>
                  </div>
                  <hr />
                  <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Name"
                        className={`form-control ${
                          errors.name && "is-invalid"
                        }`}
                        {...register("name", {
                          required: "The name field is required",
                        })}
                      />
                      {errors.name && (
                        <p className="invalid-feedback">
                          {errors.name?.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Job Title
                      </label>

                      <input
                        {...register("job_title", {
                          required: "Job title field is required",
                        })}
                        type="text"
                        placeholder="Job Title"
                        className={`form-control ${
                          errors.job_title && "is-invalid"
                        }`}
                      />

                      {errors.job_title && (
                        <p className="invalid-feedback">
                          {errors.job_title?.message}
                        </p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Linkedin Url
                      </label>
                      <input
                        type="text"
                        {...register("linkedin_url")}
                        className="form-control"
                        placeholder="Linkedin Url"
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

                    <div className="mb-3">
                      {member.image && (
                        <img
                          src={`${imageUrl}uploads/members/${member.image}`}
                          alt=""
                          className=""
                        />
                      )}
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

export default EditMember;
