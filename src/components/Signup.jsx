import React from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate()
  function handleDoctor(){
    navigate('/doctorForm')
  }
  function handlePatient(){
    navigate('/patientForm')
  }
  return (
    <div>
      <div className="dr-pat">

        <h2>Choose an option</h2>
        <div className="btns">

          <div>
            <button className="select-btn" onClick={handleDoctor}>
            <h1>I'm a doctor</h1>
            </button>
          </div>

          <div> 
            <button className="select-btn" onClick={handlePatient}>
              <h1>I'm a patient</h1>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Signup;
