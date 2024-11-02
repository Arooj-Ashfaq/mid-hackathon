import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AllDoctors = () => {
    const navigate = useNavigate()
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'doctors'));
                const doctorsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setDoctors(doctorsData);
            } catch (error) {
                console.error("Error fetching doctors: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);
    function handleApointment(){
        navigate('/apointment')
    }

    if (loading) {
        return <div className='load-err'>Loading...</div>;
    }

    return (
        <div className="doctorsContainer">
            <h2>All Doctors</h2>
            <div className="doctorsGrid">
                {doctors.map((doctor) => (
                    <div className="doctorCard" key={doctor.id}>
                        <h3>{doctor.name}</h3>
                        <p><strong>Doctor ID:</strong> {doctor.doctorId}</p>
                        <p><strong>Specialization:</strong> {doctor.specialization}</p>
                        <p><strong>Contact Info:</strong> {doctor.contactInfo}</p>
                        <h4>Schedule</h4>
                        <ul>
                            {Array.isArray(doctor.schedule) && doctor.schedule.map((slot, index) => (
                                <li key={index}>
                                    {slot.startTime} - {slot.endTime} ({slot.available ? 'Available' : 'Not Available'})
                                </li>
                            ))}
                        </ul>
                        <button onClick={handleApointment}>Book an Appointment</button>
                    </div>
                ))}
                
            </div>
            
        </div>
    );
};

export default AllDoctors;
