import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AppointmentForm = () => {
    const navigate = useNavigate()
  const [appointment, setAppointment] = useState({
    date: '',
    time: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const handleSubmit = async (e) => {
    navigate('/')
    alert('Appointment booked')
    e.preventDefault();
    try {
      await addDoc(collection(db, 'appointments'), appointment);
      console.log('Appointment submitted:', appointment);
      setAppointment({ date: '', time: '', notes: '' });
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  return (
    <div className="appointment-form-container">
      <h2 className="form-title">Schedule an Appointment</h2>
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={appointment.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            name="time"
            value={appointment.time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="notes">Additional Notes:</label>
          <textarea
            id="notes"
            name="notes"
            value={appointment.notes}
            onChange={handleChange}
            placeholder="Any specific requests or notes?"
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Schedule Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
