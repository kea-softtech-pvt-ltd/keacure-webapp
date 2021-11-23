import { Link ,useParams} from "react-router-dom";
import React from "react";
import { DoctorBookingConfirmPay} from "./doctorBookingConfirmPay";
import { PatientLoginForm } from "./patientLoginForm";
import { patientIdState }from "./recoil/selector/patientIdState"
import { useRecoilValue } from "recoil";
import { FetchPatientInfo } from "./fetchPatientInfo";

export default function DoctorBookingWithPatientLogin(){
    const {doctorId} = useParams();
    const patientId = useRecoilValue(patientIdState)
    console.log(patientId)
    return(
        <div>
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
                            {patientId?
                            <FetchPatientInfo patientId={patientId}/>
                            :
                            <PatientLoginForm redirection="payment" />
                            }
                            </div>
                        </div>
                        <DoctorBookingConfirmPay doctorId={doctorId}/>
                    </div>
                </div>

	        </main>
	    </div>
        
    )
}