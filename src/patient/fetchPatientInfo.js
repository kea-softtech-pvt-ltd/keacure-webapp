import { useEffect, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import PatientApi from "../services/PatientApi";

function FetchPatientInfo(props) {
    const { patientId } = props;
    const [ fetchPatientData, setFetchPatientData] = useState([])
    const { patientDetailsData} = PatientApi()
    const navigate = useNavigate()

    useEffect(() => {
        getAllPatientData()
    }, [fetchPatientData])

    function getAllPatientData() {
        patientDetailsData({patientId})
            .then( (response) =>{
                setFetchPatientData(response[0])
            })
    }

    const handleClick = async (event) => {
        event.preventDefault()
        navigate(`booking/${patientId}`, { state: { patientId: patientId} })
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
                        <Link onClick={(event)=>handleClick(event)} className="btn">
                            <span className="appColor">Book Appointment</span>
                        </Link>
                    </div>
                </div>
            </div>
            <Outlet/>
        </>
    )
}
export { FetchPatientInfo }