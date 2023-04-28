import { useState, useEffect } from "react";
import AuthApi from "../../../services/AuthApi";
import PatientProfile from "../../../img/profile.png"
function CalendarModalBox(props) {
    const { patientIdData } = props
    const [ patientDetails, setPatientDetails] = useState();
    const { patientDetailsData } = AuthApi()
    useEffect(() => {
        getPatientInfoById();
    }, [])

    const getPatientInfoById = async () => {
        await patientDetailsData({ patientIdData })
            .then(jsonRes => {
                setPatientDetails(jsonRes)
            })
    };

        return (
        <div>
            {patientDetails && patientDetails.map((item, id) => {
                return (
                    <div  className="d-flex container " key={id}>
                        <div className=" mx-5 align-items-left ">
                            <img src={PatientProfile} alt="Patient Profile"/>
                        </div>
                        <div>
                            <div className=" patientModalName align-item-right ">{item.name}</div>
                            <div><b className="patientModal">Email :  </b>{item.email}</div>
                            <div><b className="patientModal">Gender : </b>{item.gender}</div>
                            <div><b className="patientModal">Mobile No :  </b>{item.mobile}</div>
                            <div><b className="patientModal">Age :    </b>{item.age}</div>
                            </div>
                    </div>
                )
            })}
        </div>

    )
}
export default CalendarModalBox