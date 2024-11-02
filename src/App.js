import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import {Navbar}  from "./components/Navbar";
import SignUp from "./components/Signup";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs"
import DoctorForm from "./components/DoctorForm";
import PatientForm from "./components/PatientForm";
import MyProfile from "./components/myProfile";
import PatientProfile from "./components/PatientProfile";
import AllPatients from "./components/AllPatients";
import AllDoctors from "./components/AllDoctors";
import Apointment from "./components/Apointment";
import Login from "./components/Login";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/doctorForm" element={<DoctorForm />} />
          <Route path="/patientForm" element={<PatientForm />} />
          <Route path="/myprofile/:id" element={<MyProfile />} />
          <Route path="/patient-profile" element={<PatientProfile />} />
          <Route path="/all-patients" element={<AllPatients />} />
          <Route path="/all-doctors" element={<AllDoctors />} />
          <Route path="/apointment" element={<Apointment />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
