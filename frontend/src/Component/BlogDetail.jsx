import React, { useEffect, useState } from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Hero from "./common/Hero";
import axios from "axios";
import { apiurl, imageUrl } from "./common/http";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LatestTestimonials from "./common/LatestTestimonials";

const BlogDetail = () => {
  const [article, setArticle] = useState("");
  const [allArticle, setallArticle] = useState("");
  const params = useParams();

  const fetchArticle = async () => {
    const response = await axios.get(
      apiurl + "get-single-articles/" + params.id,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    // console.log(response.data);

    if (response.data.status) {
      setArticle(response.data.data);
    } else if (!response.data.status) {
      toast.error(response.data.message);
    } else {
      toast.error("Network Error");
    }
  };
  const fetchallArticle = async () => {
    const response = await axios.get(apiurl + "get-articles/", {
      headers: {
        Accept: "application/json",
      },
    });
    // console.log(response.data);

    if (response.data.status) {
      setallArticle(response.data.data);
    } else if (!response.data.status) {
      toast.error(response.data.message);
    } else {
      toast.error("Network Error");
    }
  };
  useEffect(() => {
    fetchArticle();
    fetchallArticle();
  }, [params.id]);

  return (
    <div>
      <Header />
      <main>
        <Hero preHeading=" Quality. Integrity. Value." heading="" text="" />
        <section className="section-11">
          <div className="container py-5">
            <div className="row">
              <div className="col-md-8">
                <h2>{article.title}</h2>
                <div className="pb-3">
                  by <strong>{article.author}</strong> on {article.created_at}
                </div>
                <div className="pe-md-5 pb-3 ">
                  {/* <img src="" alt="" /> */}
                  <img
                    className="w-100"
                    src={`${imageUrl}uploads/articals/large/${article.image}`}
                    alt=""
                  />
                  <div
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  ></div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="card shadow border-0 sidebar">
                  <div className="card-body px-5 py-4">
                    <h3 className="mt-2 mb-3">Latest Blogs</h3>

                    {allArticle &&
                      allArticle.map((article) => {
                        return (
                          <div className="d-flex border-bottom mb-3 pb-2">
                            <div className="pe-3 pb-2">
                              <Link to={`/blogs/${article.id}`}>
                                <img
                                  width={100}
                                  src={`${imageUrl}uploads/articals/large/${article.image}`}
                                  alt=""
                                />
                              </Link>
                            </div>
                            <Link className="title fs-6" to={`/blogs/${article.id}`}>
                              {article.title}
                            </Link>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetail;
