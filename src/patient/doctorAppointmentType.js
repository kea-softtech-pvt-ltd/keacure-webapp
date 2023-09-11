import React, { useEffect, useState } from "react";
import { ShowDoctorInClinicAppointment } from "./showDoctorInClinicAppointment";
import PatientApi from "../services/PatientApi";

const DoctorAppointmentType = (props) => {
    const { doctorId } = props.clinicData;
    const clinicId = props.clinicData._id
    const [clinicSession, setClinicSession] = useState([])
    const { fetchSessionSlotsData } = PatientApi()
    useEffect(() => {
        fetchSessionSlots()
    }, [])

    async function fetchSessionSlots() {
        const result = await fetchSessionSlotsData({ doctorId, clinicId })
        setClinicSession(result)
    }

    return (
            <div>
                {clinicSession.length > 0 ? (
                    <ShowDoctorInClinicAppointment doctorId={doctorId} clinicId={clinicId} setSessions={clinicSession} />
                ) : <div style={{color:"black", marginTop:'10px'}}><b>Slots Not Available</b></div>}
            </div>
    )
}
export { DoctorAppointmentType }