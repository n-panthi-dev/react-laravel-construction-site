import React, { useContext } from "react";
import { useForm } from "react-hook-form";

import Header from "../common/Header";
import Footer from "../common/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/Auth";
const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth", data);
      if (response.data.success == true) {
        // console.log(response.data);
        const userInfo = {
          id: response.data.id,
          token: response.data.token,
        };
        login(userInfo);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        navigate("/admin/dashboard");
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error.response.data.status == false) {
        const serverErrors = error.response.data.error;
        Object.keys(serverErrors).forEach((key) => {
          setError(key, {
            type: "server",
            message: serverErrors[key][0], // Adjust based on your API response
          });
        });
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <div>
      <Header />

      <main>
        <div className="container my-5 d-flex justify-content-center">
          <div className="login-form my-5">
            <div className="card border-0 shadow">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit(onSubmit)} action="">
                  <h4 className="mb-3 text-center">Login Here</h4>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Email
                    </label>
                    <input
                      {...register("email", {
                        required: "This field is required",
                        pattern: {
                          value: /^\S+@\S+$/i, // Simple email validation pattern
                          message: "Invalid email address",
                        },
                      })}
                      type="text"
                      placeholder="Enter Email"
                      className={`form-control ${errors.email && "is-invalid"}`}
                    />
                    {errors.email && (
                      <p className="invalid-feedback">
                        {errors.email?.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Password
                    </label>
                    <input
                      {...register("password", {
                        // required: "This field is required",
                      })}
                      type="password"
                      placeholder="Enter Password"
                      className={`form-control ${
                        errors.password && "is-invalid"
                      }`}
                    />
                    {errors.password && (
                      <p className="invalid-feedback">
                        {errors.password?.message}
                      </p>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
