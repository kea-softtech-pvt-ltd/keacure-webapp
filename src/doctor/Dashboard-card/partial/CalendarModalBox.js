import { useState, useEffect } from "react";
import AuthApi from "../../../services/AuthApi";
import PatientProfile from "../../../img/profile.png"
function CalendarModalBox(props) {
    const { patientId } = props
    const [patientDetails, setPatientDetails] = useState([]);
    const { patientDetailsData } = AuthApi()
    useEffect(() => {
        getPatientInfoById();
    }, [])

    const getPatientInfoById = async () => {
        await patientDetailsData({ patientId })
            .then(jsonRes => {
                setPatientDetails(jsonRes[0])
            })
    };

    return (
        <div>
                    <div className="d-flex container " >
                        <div className=" mx-4 align-items-left ">
                            <img src={PatientProfile} alt="Patient Profile" />
                        </div>
                        <div>
                            <div className=" patientModalName align-item-right ">{patientDetails.name}</div>
                            <div><b className="patientModal">Email : </b>{patientDetails.email}</div>
                            <div><b className="patientModal">Gender : </b>{patientDetails.gender}</div>
                            <div><b className="patientModal">Mobile No :  </b>{patientDetails.mobile}</div>
                            <div><b className="patientModal">Age :    </b>{patientDetails.age}</div>
                        </div>
                    </div>
        </div>

    )
}
export default CalendarModalBox