import React, { useEffect, useState } from "react";
import MemberImg from "../../assets/images/pexels-sindre-fs-1040880.jpg";
import axios from "axios";
import { apiurl, imageUrl } from "./http";
import { toast } from "react-toastify";

const Team = () => {
  const [members, setMembers] = useState("");
  const fetchMembers = async () => {
    try {
      const response = await axios.get(apiurl + "get-member", {
        headers: {
          Accept: "application/json",
        },
      });
      if (response.data.status) {
        setMembers(response.data.data);
      }
    } catch (error) {
      toast.error("Network Error");
    }
  };
  useEffect(() => {
    fetchMembers();
  }, []);
  return (
    <div className="section-8 bg-light py-5">
      <div className="container">
        <div className="section-header text-center">
          <span>Team</span>
          <h2>Our Team</h2>
          <p>
            Our team is made up of skilled professionals dedicated to delivering
            excellence in every project. <br />With expertise across various fields,
            we work collaboratively to bring innovative solutions to life.
          </p>
        </div>
        <div className="row ">
          {members &&
            members.map((member) => {
              return (
                <div key={member.id} className="col-md-6 col-lg-3">
                  <div className="card shadow border-0  mt-4">
                    <div className="card-img-top">
                      <img
                        src={`${imageUrl}uploads/members/${member.image}`}
                        className="w-100"
                        alt=""
                      />
                    </div>
                    <div className="card-body p-4">
                      <div className=" card-title mb-0 ">{member.name}</div>
                      <div className="card-sub-title mb-1">
                        {member.job_title}
                      </div>
                      {member.linkedin_url && (
                        <a target="_blank" href={member.linkedin_url}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-linkedin"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Team;
