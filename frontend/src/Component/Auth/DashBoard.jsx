import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Sidebar from "../common/Sidebar";

const DashBoard = () => {
  return (
    <div>
      <Header />
      <main>
        <div className="container my-5">
          <div className="row">
            <div className="col-md-3">
              {/* Sidebar */}
             <Sidebar/>
            </div>
            <div className="col-md-9 dashboard">
              <div className="card shadow border-0">
                <div className="card-body d-flex justify-content-center align-items-center">
                  <h4>Welcome to Admin Console</h4>
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

export default DashBoard;
