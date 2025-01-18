import React, { useEffect, useState } from "react";
import Footer from "./common/Footer";
import Header from "./common/Header";
import Hero from "./common/Hero";

import axios from "axios";
import { apiurl, imageUrl } from "./common/http";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [articles, setArticles] = useState("");
  const fetchArticle = async () => {
    try {
      const response = await axios.get(apiurl + "get-articles", {
        headers: {
          Accept: "application/json",
        },
      });
      if (response.data.status) {
        setArticles(response.data.data);
      }
    } catch (error) {
      toast.error("Network Error");
    }
  };
  useEffect(() => {
    fetchArticle();
  }, []);
  return (
    <div>
      <Header />
      <main>
        {/* Hero Section */}
        <Hero
          preHeading=" Quality. Integrity. Value."
          heading="Our Blogs"
          text="Stay updated with the latest insights, trends, and stories from our industry. <br/>
        Our blogs offer valuable information and expert perspectives."
        />

        {/* Blogs  */}
        <section className="section-6 bg-light py-5">
          <div className="container">
            <div className="section-header text-center">
              <span>Blog & News</span>
              <h2>Articles & blog posts</h2>
              <p>
                Stay up to date with the latest industry trends, insightful
                articles, and company news. Our blog offers expert perspectives
                and useful information to keep you informed and inspired.
              </p>
            </div>
            <div className="row ">
              {articles &&
                articles.map((article) => {
                  return (
                    <div className="col-md-4" key={article.id}>
                      <div className="card shadow border-0  mt-4">
                        <div className="card-img-top">
                          <img
                            src={`${imageUrl}uploads/articals/small/${article.image}`}
                            className="w-100"
                            alt=""
                          />
                        </div>
                        <div className="card-body p-4">
                          <div className="mb-4">
                            <a href="" className="title">
                              {article.title}
                            </a>
                          </div>
                          <div>
                            <Link
                              to={`/blogs/${article.id}`}
                              className="btn btn-primary"
                            >
                              Read More
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              {/* <div className="col-md-4 col-lg-4">
                <div className="card shadow border-0  mt-4">
                  <div className="card-img-top">
                    <img src={BlogImg} className="w-100" alt="" />
                  </div>
                  <div className="card-body p-4">
                    <div className="mb-4">
                      <a href="" className="title">
                        Dummy blog title
                      </a>
                    </div>
                    <div>
                      <a href="" className="btn btn-primary">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-4">
                <div className="card shadow border-0  mt-4">
                  <div className="card-img-top">
                    <img src={BlogImg} className="w-100" alt="" />
                  </div>
                  <div className="card-body p-4">
                    <div className="mb-4">
                      <a href="" className="title">
                        Dummy blog title
                      </a>
                    </div>
                    <div>
                      <a href="" className="btn btn-primary">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-4">
                <div className="card shadow border-0  mt-4">
                  <div className="card-img-top">
                    <img src={BlogImg} className="w-100" alt="" />
                  </div>
                  <div className="card-body p-4">
                    <div className="mb-4">
                      <a href="" className="title">
                        Dummy blog title
                      </a>
                    </div>
                    <div>
                      <a href="" className="btn btn-primary">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-4">
                <div className="card shadow border-0  mt-4">
                  <div className="card-img-top">
                    <img src={BlogImg} className="w-100" alt="" />
                  </div>
                  <div className="card-body p-4">
                    <div className="mb-4">
                      <a href="" className="title">
                        Dummy blog title
                      </a>
                    </div>
                    <div>
                      <a href="" className="btn btn-primary">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-4">
                <div className="card shadow border-0  mt-4">
                  <div className="card-img-top">
                    <img src={BlogImg} className="w-100" alt="" />
                  </div>
                  <div className="card-body p-4">
                    <div className="mb-4">
                      <a href="" className="title">
                        Dummy blog title
                      </a>
                    </div>
                    <div>
                      <a href="" className="btn btn-primary">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-4">
                <div className="card shadow border-0  mt-4">
                  <div className="card-img-top">
                    <img src={BlogImg} className="w-100" alt="" />
                  </div>
                  <div className="card-body p-4">
                    <div className="mb-4">
                      <a href="" className="title">
                        Dummy blog title
                      </a>
                    </div>
                    <div>
                      <a href="" className="btn btn-primary">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blogs;
