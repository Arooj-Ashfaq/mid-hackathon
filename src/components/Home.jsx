import React from "react";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";

function Home() {
  return (
    <>
    <div className="home">
      <div className="home-txt">
        <h1>Welcome to Health Xone !</h1>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="home-img">
      <img src="https://img.freepik.com/premium-vector/vector-doctor-medical-hospital-health-medicine-illustration-care-man-clinic-people-profes_1013341-114553.jpg?semt=ais_hybrid"  alt="doctor" className="home-img"/>
      </div>

        
    </div>
    <br/><br/>
    <AboutUs/>
        <ContactUs/>
    </>
  );
}

export default Home;
