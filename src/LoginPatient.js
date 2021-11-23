import {PatientLoginForm} from "./patientLoginForm";
import PatientDashboard from "./PatientDashboard";
import React from "react";
import { patientIdState }from "./recoil/selector/patientIdState"
import { useRecoilValue } from "recoil";

export default function LoginPatient(){
    const patientId = useRecoilValue(patientIdState)
    console.log(patientId)
    return(
        <div>
            {patientId ? 
            <PatientDashboard patientId={patientId}/>
            :
            <main>
                <div className="bg_color_2">
                    <div className="container margin_60_35">
                    <PatientLoginForm redirection="dashboard"/>
                    </div>
                </div>
            </main>}
	    </div>
    )
}