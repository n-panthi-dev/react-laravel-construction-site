import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear();
  return (
    <div><footer>
    <div className="container py-5">
      <div className="row">
        <div className="col-md-3">
          <h3 className="mb-3"  >Urban Construction</h3>
          <div className="pe-5">
          <p>
          Crafting dreams with <br /> precision and excellence.
          </p>
          </div>
        </div>
        <div className="col-md-3">
          <h3 className="mb-3">Our Services</h3>
          <ul>
            <li>
              <a href="">Specialty Construction</a>
            </li>
            <li>
              {" "}
              <a href="">Civil Construction</a>
            </li>
            <li>
              <a href="">Residential Construction</a>
            </li>
            <li>
              <a href="">Corporate Construction</a>
            </li>
            <li>
              <a href="">Building Construction</a>
            </li>
            <li>
              <a href="">Industrial Construction</a>
            </li>
          </ul>
        </div>
        <div className="col-md-3">
       <h3 className="mb-3" >Quick Links</h3>
          <ul>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              {" "}
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/project">Projects</a>
            </li>
            <li>
              <a href="/blogs">Blog</a>
            </li>
            <li>
              <a href="/contactw">Contact us</a>
            </li>
          </ul>
        </div>
        <div className="col-md-3">
          <h3 className="mb-3" >Contact Us</h3>
          <ul>
            <li>
              <a href="">9800000000</a>
            </li>
            <li>
              {" "}
              <a href="">hello@example.com</a>
            </li>
            <li>
              <a href="">Butwal, Rupandehi, Nepal</a>
            </li>
           
          </ul>
        </div>
        <hr />
      <div className="text-center pt-4">Copyright @ {year} Urban Constructions. All Rights Reserved</div>
      </div>
    </div>
  </footer></div>
  )
}

export default Footer