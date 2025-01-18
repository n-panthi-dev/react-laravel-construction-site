import React, { useEffect, useState } from "react";
import Footer from "../../common/Footer";
import { Link } from "react-router-dom";
import Header from "../../common/Header";
import Sidebar from "../../common/Sidebar";
import { apiurl, token } from "../../common/http";
import axios from "axios";
import { toast } from "react-toastify";

const ShowTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(apiurl + "testimonials", {
        headers: {
          Authorization: `Bearer ${token()}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      //   console.log(response.data.data);
      setTestimonials(response.data.data);
    } catch (error) {
      toast.error("Error fetching articles");
    }
  };
  const deleteTestimonials = async (id) => {
    if (confirm("Are you sure you want to delete?")) {
      const response = await axios.delete(apiurl + "testimonials/" + id, {
        headers: {
          Authorization: `Bearer ${token()}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.data.status) {
        const newTestimonials = testimonials.filter((testimonials) => {
          return testimonials.id != id;
        });
        setTestimonials(newTestimonials);
        toast.success(response.data.message);
      } else {
        toast.error("Service is not deleted");
      }
    }
  };
  useEffect(() => {
    fetchTestimonials();
  }, [token]);
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
                    <h4 className="h5"> Testimonials</h4>
                    <Link
                      to="/admin/testimonials/create"
                      className="btn btn-primary"
                    >
                      Create
                    </Link>
                  </div>
                  <hr />
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Testimonials</th>
                        <th
                          style={{
                            width: "300px",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          Citation
                        </th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testimonials &&
                        testimonials.map((testimonial) => (
                          <tr key={testimonial.id}>
                            <td>{testimonial.id}</td>
                            <td>{testimonial.testimonial}</td>
                            <td>{testimonial.citation}</td>
                            <td>
                              {testimonial.status == 1 ? "Active" : "Block"}
                            </td>
                            <td>
                              <Link
                                to={`/admin/testimonials/edit/${testimonial.id}`}
                                className="mb-2 btn btn-primary btn-sm  me-2 "
                              >
                                Edit
                              </Link>
                              <Link
                                onClick={() =>
                                  deleteTestimonials(testimonial.id)
                                }
                                className="mb-2 btn btn-secondary btn-sm"
                              >
                                Delete
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
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

export default ShowTestimonials;
