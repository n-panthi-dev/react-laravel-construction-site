import React, { useEffect, useState } from "react";
import Footer from "../../common/Footer";
import { Link } from "react-router-dom";
import Header from "../../common/Header";
import Sidebar from "../../common/Sidebar";
import { apiurl, token } from "../../common/http";
import axios from "axios";
import { toast } from "react-toastify";

const ShowMember = () => {
  const [members, setMembers] = useState([]);

  const fetchMember = async () => {
    try {
      const response = await axios.get(apiurl + "member", {
        headers: {
          Authorization: `Bearer ${token()}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      //   console.log(response.data.data);
      setMembers(response.data.data);
    } catch (error) {
      toast.error("Error fetching members");
    }
  };
  const deleteMember = async (id) => {
    if (confirm("Are you sure you want to delete?")) {
      const response = await axios.delete(apiurl + "member/" + id, {
        headers: {
          Authorization: `Bearer ${token()}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.data.status) {
        const newMember = members.filter((members) => {
          return members.id != id;
        });
        setMembers(newMember);
        toast.success(response.data.message);
      } else {
        toast.error("Method is not deleted");
      }
    }
  };
  useEffect(() => {
    fetchMember();
  }, [token]);
  `3`;
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
                    <h4 className="h5"> Members</h4>
                    <Link
                      to="/admin/members/create"
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
                        <th>Name</th>
                        <th
                          style={{
                            width: "300px",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          Job Title
                        </th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members &&
                        members.map((member) => (
                          <tr key={member.id}>
                            <td>{member.id}</td>
                            <td>{member.name}</td>
                            <td>{member.job_title}</td>
                            <td>{member.status == 1 ? "Active" : "Block"}</td>
                            <td>
                              <Link
                                to={`/admin/members/edit/${member.id}`}
                                className="mb-2 btn btn-primary btn-sm  me-2 "
                              >
                                Edit
                              </Link>
                              <Link
                                onClick={() => deleteMember(member.id)}
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

export default ShowMember;
