import axios from "axios";
import { API } from "../config";
import { useEffect, useState } from "react";
import avatarImage from "../img/profile.png";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function FetchPatientInfo(props) {
    const { patientId } = props;
    const [fetchPatientData, setFetchPatientData] = useState([])
    useEffect(() => {
        getAllPatientData()
    }, [])

    async function getAllPatientData() {
        const result = await axios.get(`${API}/patientById/${patientId}`)
            .then(function (response) {
                setFetchPatientData(response.data[0])
            })
    }

    return (
        <>
            <div className="underline">
                <div className="form_title">
                    <h3>Patient Details</h3>
                </div>
            </div>
            <div className="patientDataStyle">
                <div className="">
                    <label className="mx-2"><b>Patient name :</b></label>
                    {fetchPatientData.name}
                </div>
                <div className="">
                    <label className="mx-2"><b>Age :</b></label>
                    {fetchPatientData.age}
                </div>
                <div className="">
                    <label className="mx-2"><b>Gender :</b></label>
                    {fetchPatientData.gender}
                </div>
                <div className="">
                    <label className="mx-2"><b>Email :</b></label>
                    {fetchPatientData.email}
                </div>
                <div align='right'>
                    <div className="radius appColor buttonPatient" align='center'>
                        <Link to={`/appointmentbookingsection/${patientId}`} className="btn">
                            <span className=" appColor">Book Appointment</span>
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}
export { FetchPatientInfo }