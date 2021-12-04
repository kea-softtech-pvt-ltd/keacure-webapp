import { useEffect } from "react";
import { Link ,useParams ,useHistory} from "react-router-dom";
import {DoctorBookingConfirmation} from "./doctorbookingconfirmation";
import { PatientRegistrationForm } from "./patientRegistrationForm";

export default function CreatePatientProfile(){
    const history = useHistory()
    const { doctorId } = useParams();
    const { patientId } = useParams()

    function handalChange(){
        history.push(`/getLoginPatientProfile/${patientId}`)
    }
    return(
        <main>
            <div id="breadcrumb">
                <div className="container">
                    <ul>
                        <li><Link to="#">Home</Link></li>
                        <li><Link to="#">Category</Link></li>
                        <li>Page active</li>
                    </ul>
                </div>
            </div>
            <div className="container margin_60">
                <div className="row">
                    <div className="col-xl-8 col-lg-8">
                        <div className="box_general_3 cart">
                            <PatientRegistrationForm patientId={patientId} handalChange={handalChange}/>
                        </div>
                    </div>
                    <DoctorBookingConfirmation doctorId={doctorId}/>
                </div>
            </div>
        </main>
    )
}