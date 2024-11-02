import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const DoctorForm = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({
    doctorId: "",
    name: "",
    specialization: "",
    contactInfo: "",
    schedule: [{ slotId: "", startTime: "", endTime: "", available: true }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleScheduleChange = (index, field, value) => {
    const updatedSchedule = doctor.schedule.map((slot, i) =>
      i === index ? { ...slot, [field]: value } : slot
    );
    setDoctor({ ...doctor, schedule: updatedSchedule });
  };

  const addSlot = () => {
    setDoctor({
      ...doctor,
      schedule: [
        ...doctor.schedule,
        { slotId: "", startTime: "", endTime: "", available: true },
      ],
    });
  };

  const deleteSlot = (index) => {
    const updatedSchedule = doctor.schedule.filter((_, i) => i !== index);
    setDoctor({ ...doctor, schedule: updatedSchedule });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "doctors"), doctor);
      console.log("Doctor added with ID: ", docRef.id);
      localStorage.setItem("userName", doctor.name);
      localStorage.setItem("userEmail", doctor.contactInfo);

      navigate(`/myprofile/${docRef.id}`);
    } catch (error) {
      console.error("Error adding doctor: ", error.code, error.message);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Doctor Signup Form</h2>
      <div className="inputGroup">
        <label htmlFor="doctorId">Doctor ID:</label>
        <input
          type="text"
          id="doctorId"
          name="doctorId"
          value={doctor.doctorId}
          onChange={handleChange}
          required
        />
      </div>
      <div className="inputGroup">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={doctor.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="inputGroup">
        <label htmlFor="specialization">Specialization:</label>
        <input
          type="text"
          id="specialization"
          name="specialization"
          value={doctor.specialization}
          onChange={handleChange}
          required
        />
      </div>
      <div className="inputGroup">
        <label htmlFor="contactInfo">Contact Info:</label>
        <input
          type="email"
          id="contactInfo"
          name="contactInfo"
          value={doctor.contactInfo}
          onChange={handleChange}
          required
        />
      </div>

      <h3>Schedule</h3>
      {doctor.schedule.map((slot, index) => (
        <div key={index} className="slot">
          <div className="inputGroup">
            <label htmlFor={`slotId_${index}`}>Slot ID:</label>
            <input
              type="text"
              id={`slotId_${index}`}
              value={slot.slotId}
              onChange={(e) =>
                handleScheduleChange(index, "slotId", e.target.value)
              }
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor={`startTime_${index}`}>Start Time:</label>
            <input
              type="time"
              id={`startTime_${index}`}
              value={slot.startTime}
              onChange={(e) =>
                handleScheduleChange(index, "startTime", e.target.value)
              }
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor={`endTime_${index}`}>End Time:</label>
            <input
              type="time"
              id={`endTime_${index}`}
              value={slot.endTime}
              onChange={(e) =>
                handleScheduleChange(index, "endTime", e.target.value)
              }
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor={`available_${index}`}>Available:</label>
            <select
              id={`available_${index}`}
              value={slot.available}
              onChange={(e) =>
                handleScheduleChange(
                  index,
                  "available",
                  e.target.value === "true"
                )
              }
              required
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <button
            type="button"
            className="deleteButton"
            onClick={() => deleteSlot(index)}
          >
            Delete Slot
          </button>
        </div>
      ))}
      <button type="button" className="addButton" onClick={addSlot}>
        Add Slot
      </button>
      <button type="submit" className="submitButton">
        Submit
      </button>
    </form>
  );
};

export default DoctorForm;
