import React, { useEffect, useState } from 'react'
import Header from '../../common/Header'
import Sidebar from '../../common/Sidebar'
import Footer from '../../common/Footer'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { apiurl, token } from '../../common/http'

const Show = () => {

    const [projects, setProjects] = useState([]);

    const fetchProjects = async () => {
      try {
        const response = await axios.get(apiurl + "projects", {
          headers: {
            Authorization: `Bearer ${token()}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
  
        //   console.log(response.data.data);
        setProjects(response.data.data);
      } catch (error) {
        toast.error("Error fetching services");
      }
    };
    const deleteProject = async (id) => {
      if (confirm("Are you sure you want to delete?")) {
        const response = await axios.delete(apiurl + "projects/" + id, {
          headers: {
            Authorization: `Bearer ${token()}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        if (response.data.status) {
          const newProjects = projects.filter((project) => {
            return project.id != id;
          });
          setProjects(newProjects);
          toast.success(response.data.message);
        } else {
          toast.error("Service is not deleted");
        }
      }
    };
    useEffect(() => {
        fetchProjects();
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
                    <h4 className="h5"> Projects</h4>
                    <Link
                      to="/admin/projects/create"
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
                      {projects &&
                        projects.map((project) => (
                          <tr key={project.id}>
                            <td>{project.id}</td>
                            <td>{project.title}</td>
                            <td>{project.slug}</td>
                            <td>{project.status == 1 ? "Active" : "Block"}</td>
                            <td>
                              <Link
                                to={`/admin/projects/edit/${project.id}`}
                                className="mb-2 btn btn-primary btn-sm  me-2 "
                              >
                                Edit
                              </Link>
                              <Link
                                onClick={() => deleteProject(project.id)}
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

export default Show