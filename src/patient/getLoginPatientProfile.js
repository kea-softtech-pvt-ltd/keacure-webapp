import { Link ,useParams} from "react-router-dom";
import {DoctorBookingConfirmation} from "./doctorbookingconfirmation";
import {FetchPatientInfo} from "./fetchPatientInfo";

export default function GetLoginPatientProfile(){
    const {doctorId} = useParams()
    const {patientId} = useParams()
    return(
        <>
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
                            <FetchPatientInfo patientId={patientId}/>
                        </div>
                    </div>
                    <DoctorBookingConfirmation doctorId={doctorId}/>
                </div>
            </div>
        </main>
    </>    
    )
}