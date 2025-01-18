import React, { useEffect, useState } from 'react'
import Footer from '../../common/Footer'
import { Link } from 'react-router-dom'
import Header from '../../common/Header'
import Sidebar from '../../common/Sidebar'
import { apiurl, token } from '../../common/http'
import axios from 'axios'
import { toast } from 'react-toastify'

const ShowArticles = () => {

    const [articles, setArticles] = useState([]);

    const fetchArticles = async () => {
      try {
        const response = await axios.get(apiurl + "articles", {
          headers: {
            Authorization: `Bearer ${token()}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
  
        //   console.log(response.data.data);
        setArticles(response.data.data);
      } catch (error) {
        toast.error("Error fetching articles");
      }
    };
    const deleteArticle = async (id) => {
      if (confirm("Are you sure you want to delete?")) {
        const response = await axios.delete(apiurl + "articles/" + id, {
          headers: {
            Authorization: `Bearer ${token()}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        if (response.data.status) {
          const newArticles = articles.filter((articles) => {
            return articles.id != id;
          });
          setArticles(newArticles);
          toast.success(response.data.message);
        } else {
          toast.error("Service is not deleted");
        }
      }
    };
    useEffect(() => {
        fetchArticles();
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
                  <h4 className="h5"> Articles</h4>
                  <Link
                    to="/admin/articles/create"
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
                      <th>Title</th>
                      <th
                        style={{
                          width: "300px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        Slug
                      </th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles &&
                      articles.map((article) => (
                        <tr key={article.id}>
                          <td>{article.id}</td>
                          <td>{article.title}</td>
                          <td>{article.slug}</td>
                          <td>{article.status == 1 ? "Active" : "Block"}</td>
                          <td>
                            <Link
                              to={`/admin/articles/edit/${article.id}`}
                              className="mb-2 btn btn-primary btn-sm  me-2 "
                            >
                              Edit
                            </Link>
                            <Link
                              onClick={() => deleteArticle(article.id)}
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
  )
}

export default ShowArticles